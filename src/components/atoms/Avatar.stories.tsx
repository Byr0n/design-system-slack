import type { Meta, StoryObj } from '@storybook/react-native';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    presence: {
      control: 'select',
      options: ['none', 'online', 'away', 'dnd', 'offline'],
    },
    name: { control: 'text' },
    uri: { control: 'text' },
  },
  args: {
    name: 'Alice Johnson',
    size: 'md',
    presence: 'none',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: 'Alice Johnson' },
};

export const ExtraSmall: Story = {
  args: { name: 'Bob Smith', size: 'xs' },
};

export const Small: Story = {
  args: { name: 'Carol White', size: 'sm' },
};

export const Large: Story = {
  args: { name: 'Dave Brown', size: 'lg' },
};

export const ExtraLarge: Story = {
  args: { name: 'Eve Davis', size: 'xl' },
};

export const Online: Story = {
  args: { name: 'Alice Johnson', presence: 'online' },
};

export const Away: Story = {
  args: { name: 'Bob Smith', presence: 'away' },
};

export const DoNotDisturb: Story = {
  args: { name: 'Carol White', presence: 'dnd' },
};

export const Offline: Story = {
  args: { name: 'Dave Brown', presence: 'offline' },
};

export const WithImage: Story = {
  args: {
    name: 'Eve Davis',
    uri: 'https://i.pravatar.cc/150?img=5',
    presence: 'online',
  },
};
