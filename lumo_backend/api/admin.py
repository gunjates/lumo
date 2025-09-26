from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Category, Product, ProductImage, Tag, Cart, CartItem, Order, OrderItem, Review


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_staff', 'created_at')
    list_filter = ('is_active', 'is_staff', 'is_superuser', 'created_at')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('-created_at',)
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('phone_number', 'date_of_birth', 'is_email_verified')}),
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active', 'parent', 'created_at')
    list_filter = ('is_active', 'parent', 'created_at')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'sku', 'price', 'quantity', 'status', 'is_featured', 'category', 'created_at')
    list_filter = ('status', 'is_featured', 'category', 'created_at')
    search_fields = ('name', 'sku', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]
    ordering = ('-created_at',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'color', 'created_at')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_items', 'total_price', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__email',)
    inlines = [CartItemInline]


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'status', 'payment_status', 'total_amount', 'created_at')
    list_filter = ('status', 'payment_status', 'created_at')
    search_fields = ('order_number', 'user__email', 'billing_email')
    readonly_fields = ('order_number', 'created_at', 'updated_at')
    ordering = ('-created_at',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'rating', 'title', 'is_approved', 'created_at')
    list_filter = ('rating', 'is_approved', 'created_at')
    search_fields = ('user__email', 'product__name', 'title')
    ordering = ('-created_at',)
