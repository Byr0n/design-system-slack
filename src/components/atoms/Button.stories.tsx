import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { label: 'Primary', variant: 'primary' },
};

export const Secondary: Story = {
  args: { label: 'Secondary', variant: 'secondary' },
};

export const Ghost: Story = {
  args: { label: 'Ghost', variant: 'ghost' },
};

export const Destructive: Story = {
  args: { label: 'Delete', variant: 'destructive' },
};

export const Small: Story = {
  args: { label: 'Small', size: 'sm' },
};

export const Large: Story = {
  args: { label: 'Large', size: 'lg' },
};

export const Loading: Story = {
  args: { label: 'Saving…', loading: true },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
};

export const FullWidth: Story = {
  args: { label: 'Full Width', fullWidth: true },
};
