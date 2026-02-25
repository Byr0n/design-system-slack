import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../atoms/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Organisms/Tooltip',
  component: Tooltip,
  argTypes: {
    content: { control: 'text' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: {
    content: 'This is a helpful tooltip',
    placement: 'top',
  },
  render: (args) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Tooltip {...args}>
        <Button label="Hover / Press me" />
      </Tooltip>
    </View>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: { content: 'Shown above the element', placement: 'top' },
};

export const Bottom: Story = {
  args: { content: 'Shown below the element', placement: 'bottom' },
};

export const Left: Story = {
  args: { content: 'Shown to the left', placement: 'left' },
};

export const Right: Story = {
  args: { content: 'Shown to the right', placement: 'right' },
};

export const LongContent: Story = {
  args: {
    content: 'This tooltip has longer content that wraps to multiple lines.',
    placement: 'bottom',
  },
};
