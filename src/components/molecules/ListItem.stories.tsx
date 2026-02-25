import type { Meta, StoryObj } from '@storybook/react-native';
import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Molecules/ListItem',
  component: ListItem,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    timestamp: { control: 'text' },
    avatarName: { control: 'text' },
    presence: {
      control: 'select',
      options: ['none', 'online', 'away', 'dnd', 'offline'],
    },
    unreadCount: { control: 'number' },
    isMuted: { control: 'boolean' },
    isSelected: { control: 'boolean' },
  },
  args: {
    title: 'general',
    subtitle: 'Welcome to the team!',
    timestamp: '12:34',
    isMuted: false,
    isSelected: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Channel: Story = {
  args: {
    title: '# general',
    subtitle: 'Welcome to the team!',
    timestamp: '12:34',
  },
};

export const ChannelUnread: Story = {
  args: {
    title: '# engineering',
    subtitle: 'PR #42 is ready for review',
    timestamp: '09:15',
    unreadCount: 7,
  },
};

export const ChannelMuted: Story = {
  args: {
    title: '# off-topic',
    subtitle: 'Anyone watched the game last night?',
    timestamp: 'Yesterday',
    isMuted: true,
  },
};

export const ChannelSelected: Story = {
  args: {
    title: '# design',
    subtitle: 'New Figma file dropped',
    timestamp: '11:00',
    isSelected: true,
  },
};

export const DirectMessage: Story = {
  args: {
    title: 'Alice Johnson',
    subtitle: 'Sounds good, thanks!',
    timestamp: '13:01',
    avatarName: 'Alice Johnson',
    presence: 'online',
    unreadCount: 2,
  },
};

export const DirectMessageAway: Story = {
  args: {
    title: 'Bob Smith',
    subtitle: 'Will review tomorrow',
    timestamp: 'Yesterday',
    avatarName: 'Bob Smith',
    presence: 'away',
  },
};

export const NoSubtitle: Story = {
  args: {
    title: '# announcements',
    timestamp: '3d',
  },
};
