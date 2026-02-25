import React from 'react';
import type { Preview } from '@storybook/react-native';
import { View } from 'react-native';
import { ThemeProvider } from '../src/theme';

/**
 * Global Storybook preview — wraps every story with the ThemeProvider
 * so all components have access to design tokens.
 */
const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider initialMode="light">
        <View style={{ flex: 1, padding: 16 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(color|background|border)$/i,
      },
    },
  },
};

export default preview;
