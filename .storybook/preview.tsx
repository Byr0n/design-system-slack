import React from 'react';
import type { Preview } from '@storybook/react';
import { View } from 'react-native';
import { ThemeProvider } from '../src/theme';

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
