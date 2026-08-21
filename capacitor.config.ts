import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'lev.charger.com',
  appName: 'LEV Charger',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  plugins: {
    BarcodeScanner: {
      permissions: ['camera']
    }
  }
};

export default config;
