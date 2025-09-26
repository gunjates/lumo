from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'api'

urlpatterns = [
    # Authentication
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/profile/', views.UserProfileView.as_view(), name='profile'),
    
    # Categories
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('categories/<int:pk>/', views.CategoryDetailView.as_view(), name='category-detail'),
    
    # Products
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/featured/', views.FeaturedProductsView.as_view(), name='featured-products'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('products/<int:product_id>/reviews/', views.ReviewListView.as_view(), name='product-reviews'),
    
    # Cart
    path('cart/', views.CartView.as_view(), name='cart'),
    path('cart/add/', views.AddToCartView.as_view(), name='add-to-cart'),
    path('cart/items/<int:item_id>/', views.UpdateCartItemView.as_view(), name='update-cart-item'),
    path('cart/items/<int:item_id>/remove/', views.RemoveFromCartView.as_view(), name='remove-from-cart'),
    
    # Orders
    path('orders/', views.OrderListView.as_view(), name='order-list'),
    path('orders/<int:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
    
    # Health Check
    path('health/', views.health_check, name='health-check'),
]

