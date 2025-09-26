from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import User, Category, Product, ProductImage, Tag, Cart, CartItem, Order, OrderItem, Review


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name', 'password', 'password_confirm')

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'phone_number', 'date_of_birth', 'is_email_verified', 'created_at')
        read_only_fields = ('id', 'created_at', 'is_email_verified')


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError('Must include email and password')


class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'description', 'image', 'is_active', 'parent', 'children', 'product_count', 'created_at', 'updated_at')

    def get_children(self, obj):
        if obj.children.exists():
            return CategorySerializer(obj.children.all(), many=True).data
        return []

    def get_product_count(self, obj):
        return obj.products.filter(status='published').count()


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug', 'color', 'created_at')


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image', 'alt_text', 'is_primary', 'sort_order')


class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)
    discount_percentage = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = ('id', 'name', 'slug', 'short_description', 'price', 'compare_price', 'discount_percentage', 'sku', 'quantity', 'is_in_stock', 'is_featured', 'category', 'primary_image', 'tags', 'created_at')

    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image:
            return ProductImageSerializer(primary_image).data
        return None


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    discount_percentage = serializers.ReadOnlyField()
    reviews = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.reviews.filter(is_approved=True)[:5]  # Limit to 5 recent reviews
        return ReviewSerializer(reviews, many=True).data

    def get_average_rating(self, obj):
        reviews = obj.reviews.filter(is_approved=True)
        if reviews.exists():
            return round(sum(review.rating for review in reviews) / reviews.count(), 1)
        return 0


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'product_id', 'quantity', 'total_price', 'created_at', 'updated_at')
        read_only_fields = ('id', 'total_price', 'created_at', 'updated_at')

    def create(self, validated_data):
        product_id = validated_data.pop('product_id')
        try:
            product = Product.objects.get(id=product_id, status='published')
            validated_data['product'] = product
            return super().create(validated_data)
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product not found or not available")


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.ReadOnlyField()
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ('id', 'items', 'total_items', 'total_price', 'created_at', 'updated_at')


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('id', 'product_name', 'product_sku', 'quantity', 'unit_price', 'total_price')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ('id', 'order_number', 'created_at', 'updated_at')


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ('id', 'user', 'rating', 'title', 'comment', 'is_verified_purchase', 'created_at')
        read_only_fields = ('id', 'user', 'is_verified_purchase', 'created_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

