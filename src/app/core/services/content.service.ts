import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface IntroContent {
  pageTitle: string;
  subtitle: string;
  description: string;
  backgroundImage: {
    url: string;
    alt: string;
  };
  buttons: {
    primary: {
      text: string;
      route: string;
      icon: string;
      style: string;
    };
    secondary: {
      text: string;
      route: string;
      icon: string;
      style: string;
    };
  };
  branding: {
    logo: {
      url: string;
      alt: string;
    };
    fullLogo: {
      url: string;
      alt: string;
    };
  };
  animations: {
    fadeInDelay: {
      title: string;
      subtitle: string;
      description: string;
      buttons: string;
    };
  };
}

export interface NavigationContent {
  brand: {
    name: string;
    logo: {
      url: string;
      alt: string;
    };
  };
  menuItems: Array<{
    text: string;
    route: string;
    icon: string;
  }>;
  footer: {
    copyright: string;
    links: Array<{
      text: string;
      route: string;
    }>;
  };
}

export interface AppContent {
  app: {
    name: string;
    title: string;
    description: string;
    version: string;
    favicon: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    successColor: string;
    warningColor: string;
    errorColor: string;
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    enablePWA: boolean;
    enableAnalytics: boolean;
    enableErrorReporting: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private contentCache = new Map<string, any>();
  private contentLoaded = new BehaviorSubject<boolean>(false);
  private readonly STATIC_BASE_URL = '/assets/content'; // Static content endpoint

  constructor(private http: HttpClient) {}

  /**
   * Load content from static server
   */
  loadContent<T>(contentType: string): Observable<T> {
    // Check cache first
    if (this.contentCache.has(contentType)) {
      return of(this.contentCache.get(contentType));
    }

    // Load from static server
    const url = `${this.STATIC_BASE_URL}/${contentType}.json`;

    console.log(`Loading content from: ${url}`);
    return this.http.get<T>(url).pipe(
      map(content => {
        console.log(`Content loaded successfully for ${contentType}:`, content);
        this.contentCache.set(contentType, content);
        this.contentLoaded.next(true);
        return content;
      }),
      catchError(error => {
        console.error(`Error loading content for ${contentType}:`, error);
        console.log('Using fallback content');
        // Return fallback content
        return of(this.getFallbackContent(contentType));
      })
    );
  }

  /**
   * Get intro content
   */
  getIntroContent(): Observable<IntroContent> {
    return this.loadContent<IntroContent>('intro');
  }

  /**
   * Get navigation content
   */
  getNavigationContent(): Observable<NavigationContent> {
    return this.loadContent<NavigationContent>('navigation');
  }

  /**
   * Get app content
   */
  getAppContent(): Observable<AppContent> {
    return this.loadContent<AppContent>('app');
  }

  /**
   * Check if content is loaded
   */
  isContentLoaded(): Observable<boolean> {
    return this.contentLoaded.asObservable();
  }

  /**
   * Clear content cache
   */
  clearCache(): void {
    this.contentCache.clear();
    this.contentLoaded.next(false);
  }

  /**
   * Get fallback content when JSON files fail to load
   */
  private getFallbackContent(contentType: string): any {
    const fallbackContent: { [key: string]: any } = {
      intro: {
        pageTitle: 'Welcome to Lumo',
        subtitle: 'Your Ultimate E-commerce Experience',
        description: 'Discover amazing products, enjoy seamless shopping, and experience the future of online retail.',
        backgroundImage: {
          url: '/assets/shopping-venture-1080967.jpg',
          alt: 'Shopping Experience'
        },
        buttons: {
          primary: {
            text: 'Sign In',
            route: '/auth/login',
            icon: 'login',
            style: 'primary'
          },
          secondary: {
            text: 'Browse Products',
            route: '/products',
            icon: 'shopping-cart',
            style: 'outline'
          }
        },
        branding: {
          logo: {
            url: '/assets/logo.png',
            alt: 'Lumo Logo'
          },
          fullLogo: {
            url: '/assets/logo full.png',
            alt: 'Lumo Full Logo'
          }
        },
        animations: {
          fadeInDelay: {
            title: '0s',
            subtitle: '0.2s',
            description: '0.4s',
            buttons: '0.6s'
          }
        }
      },
      navigation: {
        brand: {
          name: 'Lumo',
          logo: {
            url: 'assets/logo.png',
            alt: 'Lumo Logo'
          }
        },
        menuItems: [
          { text: 'Home', route: '/', icon: 'home' },
          { text: 'Products', route: '/products', icon: 'shopping-bag' },
          { text: 'Cart', route: '/cart', icon: 'shopping-cart' },
          { text: 'Login', route: '/auth/login', icon: 'user' }
        ],
        footer: {
          copyright: '© 2024 Lumo. All rights reserved.',
          links: [
            { text: 'About', route: '/about' },
            { text: 'Contact', route: '/contact' },
            { text: 'Privacy Policy', route: '/privacy' }
          ]
        }
      },
      app: {
        app: {
          name: 'Lumo',
          title: 'Lumo E-commerce',
          description: 'Your Ultimate E-commerce Experience',
          version: '1.0.0',
          favicon: 'assets/logo.png'
        },
        theme: {
          primaryColor: '#667eea',
          secondaryColor: '#764ba2',
          accentColor: '#ff6b6b',
          successColor: '#10b981',
          warningColor: '#f59e0b',
          errorColor: '#ef4444'
        },
        api: {
          baseUrl: 'http://localhost:8000/api',
          timeout: 30000
        },
        features: {
          enablePWA: false,
          enableAnalytics: false,
          enableErrorReporting: true
        }
      }
    };

    return fallbackContent[contentType] || {};
  }
}
