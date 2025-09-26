# Lumo E-commerce Backend

A modern Django REST API backend for the Lumo E-commerce platform.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Product Management**: Complete product catalog with categories, images, and tags
- **Shopping Cart**: Session-based cart management
- **Order Management**: Full order processing system
- **Reviews**: Product review system
- **Admin Interface**: Comprehensive Django admin interface
- **API Documentation**: Auto-generated API documentation
- **Security**: Production-ready security configurations

## Technology Stack

- **Django 5.2.6**: Web framework
- **Django REST Framework**: API framework
- **PostgreSQL**: Production database
- **SQLite**: Development database
- **Redis**: Caching and session storage
- **JWT**: Authentication tokens
- **Pillow**: Image processing

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lumo_backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DEBUG=True
   SECRET_KEY=your-secret-key-here
   ALLOWED_HOSTS=localhost,127.0.0.1
   DB_NAME=lumo_ecommerce
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_HOST=localhost
   DB_PORT=5432
   ```

5. **Database Setup**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the server**
   ```bash
   python manage.py runserver
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/` - Update user profile

### Categories
- `GET /api/categories/` - List all categories
- `GET /api/categories/{id}/` - Get category details

### Products
- `GET /api/products/` - List products (with filtering and search)
- `GET /api/products/featured/` - Get featured products
- `GET /api/products/{id}/` - Get product details
- `GET /api/products/{id}/reviews/` - Get product reviews

### Cart
- `GET /api/cart/` - Get user's cart
- `POST /api/cart/add/` - Add item to cart
- `PATCH /api/cart/items/{id}/` - Update cart item quantity
- `DELETE /api/cart/items/{id}/remove/` - Remove item from cart

### Orders
- `GET /api/orders/` - List user's orders
- `POST /api/orders/` - Create new order
- `GET /api/orders/{id}/` - Get order details

### Reviews
- `GET /api/products/{id}/reviews/` - Get product reviews
- `POST /api/products/{id}/reviews/` - Create product review

## Development

### Running Tests
```bash
python manage.py test
```

### Code Formatting
```bash
black .
isort .
flake8
```

### Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

## Production Deployment

1. **Environment Variables**
   Set production environment variables:
   ```env
   DEBUG=False
   SECRET_KEY=your-production-secret-key
   ALLOWED_HOSTS=your-domain.com
   DB_NAME=production_db_name
   DB_USER=production_db_user
   DB_PASSWORD=production_db_password
   DB_HOST=production_db_host
   ```

2. **Static Files**
   ```bash
   python manage.py collectstatic
   ```

3. **Database Migration**
   ```bash
   python manage.py migrate
   ```

4. **Run with Gunicorn**
   ```bash
   gunicorn core.wsgi:application
   ```

## API Documentation

The API documentation is available at `/api/docs/` when running the development server.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

