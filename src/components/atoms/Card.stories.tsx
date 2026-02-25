import React from 'react';
import { Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  argTypes: {
    elevation: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg'],
    },
    padding: { control: 'number' },
  },
  args: {
    elevation: 'sm',
  },
  render: (args) => (
    <Card {...args}>
      <Text style={{ fontSize: 15 }}>Card content goes here.</Text>
    </Card>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Flat: Story = {
  args: { elevation: 'none' },
};

export const Subtle: Story = {
  args: { elevation: 'xs' },
};

export const Raised: Story = {
  args: { elevation: 'md' },
};

export const FloatingHigh: Story = {
  args: { elevation: 'lg' },
};

export const CompactPadding: Story = {
  args: { padding: 8 },
};

export const NoPadding: Story = {
  args: { padding: 0 },
};
