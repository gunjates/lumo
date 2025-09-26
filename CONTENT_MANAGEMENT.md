# Content Management System

## Overview
This project uses a JSON-based content management system to separate content from code, making it easy to update text, images, and configuration without touching the codebase.

## File Structure
```
lumo_content/                    # Source content files (edit these)
├── intro.json                   # Introduction page content
├── navigation.json              # Navigation and footer content
└── app.json                     # App configuration and theme
```

## Direct Import Approach (Current Implementation)

### How It Works
We use TypeScript's direct import feature to import JSON files directly from the `lumo_content/` directory:

```typescript
// Direct imports from source directory
import introContent from '../../../../lumo_content/intro.json';
import navigationContent from '../../../../lumo_content/navigation.json';
import appContent from '../../../../lumo_content/app.json';
```

### Configuration Required
The `tsconfig.json` includes these settings to enable JSON imports:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### Benefits of Direct Import
1. **No File Duplication** - Single source of truth
2. **Automatic Updates** - Changes reflect immediately without copying
3. **TypeScript Support** - Full type checking and IntelliSense
4. **Faster Loading** - No HTTP requests needed
5. **Version Control** - Changes are tracked properly
6. **No Build Scripts** - No need for copy scripts or automation
7. **Immediate Feedback** - Changes are visible instantly during development

### How Content is Loaded
```typescript
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor() {
    // Content is loaded directly at service initialization
    this.contentCache.set('intro', introContent);
    this.contentCache.set('navigation', navigationContent);
    this.contentCache.set('app', appContent);
  }

  getIntroContent(): Observable<IntroContent> {
    return of(introContent); // Direct return, no HTTP request
  }
}
```

## Recommended Workflow

### For Development
1. Edit content files in `lumo_content/`
2. Changes are immediately available (no copying needed)
3. Hot reload will pick up changes automatically

### For Production
1. Edit content files in `lumo_content/`
2. Run `npm run build` (content is bundled automatically)
3. Deploy the built application

### No Manual Steps Required!
- ✅ No copying files
- ✅ No running scripts
- ✅ No remembering to sync
- ✅ Changes are instant

## Content File Structure

### intro.json
```json
{
  "pageTitle": "Welcome to Lumo",
  "subtitle": "Your Ultimate E-commerce Experience",
  "description": "Discover amazing products...",
  "buttons": {
    "primary": {
      "text": "Sign In",
      "route": "/auth/login",
      "icon": "login",
      "style": "primary"
    },
    "secondary": {
      "text": "Browse Products", 
      "route": "/products",
      "icon": "shopping-cart",
      "style": "secondary"
    }
  }
}
```

### navigation.json
```json
{
  "brand": {
    "name": "Lumo",
    "logo": {
      "url": "assets/logo.png",
      "alt": "Lumo Logo"
    }
  },
  "menuItems": [
    {
      "text": "Home",
      "route": "/",
      "icon": "home"
    }
  ]
}
```

### app.json
```json
{
  "app": {
    "name": "Lumo",
    "title": "Lumo E-commerce",
    "version": "1.0.0"
  },
  "theme": {
    "primaryColor": "#667eea",
    "secondaryColor": "#764ba2"
  }
}
```

## Future Improvements

### 1. Content Management API
- Create a backend API to manage content
- Admin interface for content editing
- Real-time content updates

### 2. Content Versioning
- Git-based content versioning
- Content rollback capabilities
- Content change history

### 3. Multi-language Support
- Multiple language content files
- Language switching
- RTL language support

### 4. Content Validation
- JSON schema validation
- Content type checking
- Required field validation

## Best Practices

1. **Always edit files in `lumo_content/`** - This is the source of truth
2. **Run `npm run copy-content`** after making changes
3. **Use descriptive content keys** - Make content self-documenting
4. **Keep content files small** - Split large content into multiple files
5. **Use consistent naming** - Follow the same pattern across all files
6. **Validate JSON** - Ensure JSON is valid before copying

## Troubleshooting

### Content Not Updating
1. Check if files were copied to `lumo/src/assets/content/`
2. Run `npm run copy-content` manually
3. Clear browser cache
4. Check browser console for errors

### JSON Errors
1. Validate JSON syntax using online tools
2. Check for missing commas or brackets
3. Ensure all strings are properly quoted

### Build Issues
1. Ensure all content files are copied before building
2. Check that all referenced content exists
3. Verify file paths are correct
