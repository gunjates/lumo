export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  appName: 'Lumo E-commerce',
  version: '1.0.0',
  features: {
    enablePWA: false,
    enableAnalytics: false,
    enableErrorReporting: true
  },
  api: {
    timeout: 30000,
    retryAttempts: 3
  }
};

