from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.db.models import Q, Avg, Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import User, Category, Product, Cart, CartItem, Order, Review
from .serializers import (
    UserRegistrationSerializer, UserSerializer, LoginSerializer,
    CategorySerializer, ProductListSerializer, ProductDetailSerializer,
    CartSerializer, CartItemSerializer, OrderSerializer, ReviewSerializer
)


class RegisterView(APIView):
    """User registration endpoint"""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'token': str(refresh.access_token),
                'refresh_token': str(refresh)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """User login endpoint"""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'token': str(refresh.access_token),
                'refresh_token': str(refresh)
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """User profile management"""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class CategoryListView(generics.ListAPIView):
    """List all categories"""
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class CategoryDetailView(generics.RetrieveAPIView):
    """Get category details"""
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class ProductListView(generics.ListAPIView):
    """List products with filtering and search"""
    queryset = Product.objects.filter(status='published').select_related('category').prefetch_related('images', 'tags')
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'is_featured', 'tags']
    search_fields = ['name', 'description', 'short_description', 'tags__name']
    ordering_fields = ['created_at', 'price', 'name']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Filter by stock availability
        in_stock = self.request.query_params.get('in_stock')
        if in_stock and in_stock.lower() == 'true':
            queryset = queryset.filter(quantity__gt=0)
        
        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    """Get product details"""
    queryset = Product.objects.filter(status='published').select_related('category').prefetch_related('images', 'tags', 'reviews')
    serializer_class = ProductDetailSerializer
    permission_classes = [permissions.AllowAny]


class FeaturedProductsView(generics.ListAPIView):
    """Get featured products"""
    queryset = Product.objects.filter(status='published', is_featured=True).select_related('category').prefetch_related('images')
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]


class CartView(generics.RetrieveUpdateDestroyAPIView):
    """Cart management"""
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart


class AddToCartView(APIView):
    """Add item to cart"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        try:
            product = Product.objects.get(id=product_id, status='published')
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        if product.track_quantity and product.quantity < quantity:
            return Response({'error': 'Insufficient stock'}, status=status.HTTP_400_BAD_REQUEST)

        cart, created = Cart.objects.get_or_create(user=request.user)
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)


class UpdateCartItemView(APIView):
    """Update cart item quantity"""
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, item_id):
        try:
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

        quantity = request.data.get('quantity')
        if quantity is None:
            return Response({'error': 'Quantity is required'}, status=status.HTTP_400_BAD_REQUEST)

        if quantity <= 0:
            cart_item.delete()
            return Response({'message': 'Item removed from cart'}, status=status.HTTP_200_OK)

        if cart_item.product.track_quantity and cart_item.product.quantity < quantity:
            return Response({'error': 'Insufficient stock'}, status=status.HTTP_400_BAD_REQUEST)

        cart_item.quantity = quantity
        cart_item.save()

        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_200_OK)


class RemoveFromCartView(APIView):
    """Remove item from cart"""
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, item_id):
        try:
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
            cart_item.delete()
            return Response({'message': 'Item removed from cart'}, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)


class OrderListView(generics.ListCreateAPIView):
    """List and create orders"""
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderDetailView(generics.RetrieveAPIView):
    """Get order details"""
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class ReviewListView(generics.ListCreateAPIView):
    """List and create product reviews"""
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        return Review.objects.filter(product_id=product_id, is_approved=True).order_by('-created_at')

    def perform_create(self, serializer):
        product_id = self.kwargs.get('product_id')
        serializer.save(user=self.request.user, product_id=product_id)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def health_check(request):
    """Health check endpoint"""
    return Response({
        'status': 'healthy',
        'message': 'Lumo E-commerce API is running'
    }, status=status.HTTP_200_OK)