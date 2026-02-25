import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, ToastProvider } from './src';
import { ShowcaseScreen } from './src/storybook';

// Set EXPO_PUBLIC_STORYBOOK=true in your .env or shell to boot Storybook instead of the app.
// Example:  EXPO_PUBLIC_STORYBOOK=true npx expo start
const STORYBOOK_ENABLED = process.env.EXPO_PUBLIC_STORYBOOK === 'true';

function MainApp() {
  return (
    <ThemeProvider initialMode="system">
      <ToastProvider>
        <StatusBar style="light" />
        <ShowcaseScreen />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default function App() {
  if (STORYBOOK_ENABLED) {
    // Dynamically require the Storybook UI so Metro can tree-shake it
    // from the production bundle when EXPO_PUBLIC_STORYBOOK is not set.
    const { view } = require('./.rnstorybook/storybook.requires');
    const StorybookUIRoot = view.getStorybookUI({ onDeviceUI: true });
    return <StorybookUIRoot />;
  }

  return <MainApp />;
}
