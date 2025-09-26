# Content Management System (CMS) Implementation

## Overview
This project implements a simple and effective content management system using static content files:
1. **Static Content** - Angular assets directory (current implementation)
2. **Future: Backend CMS** - Django REST API endpoints (planned)
3. **Future: External CMS** - Third-party content management systems (planned)

## Architecture

### Frontend (Angular)
```typescript
// Content Service with static content
export class ContentService {
  private readonly STATIC_BASE_URL = '/assets/content';   // Static content
  
  // Load from static server
  loadContent<T>(contentType: string): Observable<T>
  
  // Specific methods
  getIntroContent(): Observable<IntroContent>
  getNavigationContent(): Observable<NavigationContent>
  getAppContent(): Observable<AppContent>
}
```

### Static Content Server
```
# Content served from Angular assets
GET /assets/content/intro.json          - Introduction page content
GET /assets/content/navigation.json     - Navigation content  
GET /assets/content/app.json            - App configuration
```

## Usage Examples

### 1. Basic Content Loading
```typescript
// Load from static server
this.contentService.getIntroContent().subscribe(content => {
  console.log(content.pageTitle);
});

// Load navigation content
this.contentService.getNavigationContent().subscribe(content => {
  console.log(content.brand.name);
});
```

### 2. Generic Content Loading
```typescript
// Load any content type from static server
this.contentService.loadContent('intro').subscribe(content => {
  // Handle content
});

// Load app configuration
this.contentService.getAppContent().subscribe(config => {
  console.log(config.app.name);
});
```

### 3. Simple HTTP Pattern
```typescript
// Direct HTTP request to static content
public static getIntroPage(http: HttpClient): Observable<IntroContent> {
  return http.get('/assets/content/intro.json').pipe(
    map((response: IntroContent) => response)
  );
}
```

## Content Sources

### 1. Static Content (Current Implementation)
- **Location**: `lumo/src/assets/content/`
- **URL**: `/assets/content/intro.json`
- **Use Case**: Development, production, simple content management
- **Pros**: Fast, simple, no backend needed, easy to manage
- **Cons**: Requires rebuild for changes, not dynamic

### 2. Future: Backend CMS (Planned)
- **Location**: `lumo_backend/api/cms_views.py` (to be created)
- **URL**: `/api/cms/intro/` (planned)
- **Use Case**: Production, dynamic content
- **Pros**: Dynamic, versioned, cached
- **Cons**: Requires backend, more complex

### 3. Future: External CMS (Planned)
- **Location**: Third-party CMS (Strapi, Contentful, etc.)
- **URL**: External API endpoints (planned)
- **Use Case**: Enterprise content management
- **Pros**: Professional CMS features, non-technical editing
- **Cons**: External dependency, cost

## Content File Structure

### Static Content
```
lumo/src/assets/content/
├── intro.json                   # Introduction page
├── navigation.json              # Navigation & footer
└── app.json                     # App configuration
```

### Source Content (for editing)
```
lumo_content/
├── intro.json                   # Source content files
├── navigation.json              # Edit these files
└── app.json                     # Then copy to assets/content/
```

## API Endpoints

### Static Content Endpoints (Current)
```
GET /assets/content/intro.json          # Introduction content
GET /assets/content/navigation.json     # Navigation content
GET /assets/content/app.json            # App configuration
```

### Future: Backend CMS Endpoints (Planned)
```
GET /api/cms/                    # List all content types
GET /api/cms/intro/              # Introduction content
GET /api/cms/navigation/         # Navigation content
GET /api/cms/app/                # App configuration
```

## Configuration

### Environment-based Content Source
```typescript
// environment.ts
export const environment = {
  production: false,
  contentSource: 'static', // 'static' | 'cms' | 'external'
  cmsBaseUrl: '/api/cms',
  staticBaseUrl: '/content'
};

// Usage
const useCms = environment.contentSource === 'cms';
this.contentService.getIntroContent(useCms);
```

### Backend Settings
```python
# settings.py
CMS_CONTENT_DIR = os.path.join(BASE_DIR, '..', 'lumo_content')
STATIC_CONTENT_DIR = os.path.join(STATIC_ROOT, 'content')
```

## Caching Strategy

### Frontend Caching
```typescript
// Content is cached in memory after first load
private contentCache = new Map<string, any>();

// Check cache first, then load from source
if (this.contentCache.has(contentType)) {
  return of(this.contentCache.get(contentType));
}
```

### Backend Caching (Future)
```python
# Django cache framework
from django.core.cache import cache

@cache_page(60 * 15)  # Cache for 15 minutes
def get_content(request, content_type):
    # Content loading logic
```

## Error Handling

### Fallback Content
```typescript
// If content loading fails, return fallback
catchError(error => {
  console.error(`Error loading content: ${error}`);
  return of(this.getFallbackContent(contentType));
})
```

### Backend Error Handling
```python
try:
    with open(content_path, 'r') as f:
        content_data = json.load(f)
    return Response(content_data)
except FileNotFoundError:
    return Response({'error': 'Content not found'}, status=404)
except json.JSONDecodeError:
    return Response({'error': 'Invalid JSON'}, status=500)
```

## Development Workflow

### 1. Content Updates
```bash
# Edit content files
vim lumo_content/intro.json

# For static content (development)
cp lumo_content/*.json lumo/src/assets/content/

# For CMS content (production)
# Content is automatically served from lumo_content/
```

### 2. Testing
```bash
# Test static content
curl http://localhost:4200/content/intro.json

# Test CMS content
curl http://localhost:8000/api/cms/intro/
```

## Production Deployment

### 1. Static Content
- Content files are bundled with Angular build
- Served by web server (Nginx, Apache)
- CDN can cache content files

### 2. Backend CMS
- Django serves content via REST API
- Can be cached with Redis/Memcached
- Load balancer can distribute requests

### 3. External CMS
- Third-party CMS manages content
- API calls to external service
- Webhook updates for real-time changes

## Future Enhancements

### 1. Content Versioning
```python
# Versioned content API
GET /api/cms/intro/?version=1.2.0
GET /api/cms/intro/?version=latest
```

### 2. Content Validation
```python
# JSON schema validation
from jsonschema import validate

def validate_content(content, schema):
    validate(instance=content, schema=schema)
```

### 3. Content Search
```python
# Full-text search for content
GET /api/cms/search/?q=welcome&type=intro
```

### 4. Content Analytics
```python
# Track content usage
@api_view(['GET'])
def get_content_analytics(request):
    # Return content usage statistics
```

## Best Practices

1. **Always use fallback content** - Never break the UI
2. **Cache content appropriately** - Balance performance and freshness
3. **Validate content structure** - Ensure JSON is valid
4. **Use TypeScript interfaces** - Type safety for content
5. **Handle errors gracefully** - Show fallback content on errors
6. **Monitor content loading** - Track performance and errors
7. **Version content changes** - Track content updates
8. **Test both sources** - Ensure static and CMS work

## Migration Path

### Phase 1: Static Content (Current)
- ✅ Basic content loading from static files
- ✅ Fallback content system
- ✅ TypeScript interfaces

### Phase 2: Backend CMS (Next)
- ✅ Django CMS API endpoints
- ✅ Content caching
- ✅ Error handling

### Phase 3: External CMS (Future)
- 🔄 Third-party CMS integration
- 🔄 Real-time content updates
- 🔄 Advanced content management features
