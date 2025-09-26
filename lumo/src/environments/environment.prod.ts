export const environment = {
  production: true,
  apiUrl: 'https://api.lumo-ecommerce.com/api',
  appName: 'Lumo E-commerce',
  version: '1.0.0',
  features: {
    enablePWA: true,
    enableAnalytics: true,
    enableErrorReporting: true
  },
  api: {
    timeout: 30000,
    retryAttempts: 3
  }
};

