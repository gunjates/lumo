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
    

    # Health Check
    path('health/', views.health_check, name='health-check'),
]

