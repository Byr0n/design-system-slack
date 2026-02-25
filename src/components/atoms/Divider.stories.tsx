import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    label: { control: 'text' },
  },
  args: {
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const WithLabel: Story = {
  args: { label: 'Today' },
};

export const WithLongLabel: Story = {
  args: { label: 'January 15, 2025' },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
      <Divider {...args} />
    </View>
  ),
};
