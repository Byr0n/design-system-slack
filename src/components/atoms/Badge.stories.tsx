import type { Meta, StoryObj } from '@storybook/react-native';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    label: { control: 'text' },
    count: { control: 'number' },
    dot: { control: 'boolean' },
    maxCount: { control: 'number' },
  },
  args: {
    variant: 'default',
    dot: false,
    maxCount: 99,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  args: { label: 'New', variant: 'default' },
};

export const WithCount: Story = {
  args: { count: 5 },
};

export const OverMaxCount: Story = {
  args: { count: 120, maxCount: 99 },
};

export const Success: Story = {
  args: { label: 'Active', variant: 'success' },
};

export const Warning: Story = {
  args: { label: 'Review', variant: 'warning' },
};

export const Danger: Story = {
  args: { label: 'Urgent', variant: 'danger' },
};

export const Info: Story = {
  args: { label: 'Info', variant: 'info' },
};

export const Neutral: Story = {
  args: { label: 'Draft', variant: 'neutral' },
};

export const DotMode: Story = {
  args: { dot: true, variant: 'danger' },
};
