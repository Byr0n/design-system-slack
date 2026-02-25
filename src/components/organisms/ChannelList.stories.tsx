import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-native';
import { ChannelList } from './ChannelList';
import type { Channel } from './ChannelList';

const CHANNELS: Channel[] = [
  {
    id: '1',
    name: 'general',
    subtitle: 'Welcome to the team! 👋',
    timestamp: '12:34',
    unreadCount: 3,
  },
  {
    id: '2',
    name: 'engineering',
    subtitle: 'PR #42 is ready for review',
    timestamp: '11:15',
  },
  {
    id: '3',
    name: 'design',
    subtitle: 'New Figma file dropped 🎨',
    timestamp: '09:30',
    isMuted: true,
  },
  {
    id: '4',
    name: 'random',
    subtitle: 'Has anyone seen my standup notes?',
    timestamp: 'Yesterday',
  },
  {
    id: '5',
    name: 'announcements',
    subtitle: 'Company all-hands next Friday',
    timestamp: '3d',
  },
];

const DMS: Channel[] = [
  {
    id: 'd1',
    name: 'Alice Johnson',
    subtitle: 'Sounds good, thanks!',
    timestamp: '13:01',
    isDM: true,
    presence: 'online',
    unreadCount: 1,
  },
  {
    id: 'd2',
    name: 'Bob Smith',
    subtitle: 'Will review tomorrow',
    timestamp: 'Yesterday',
    isDM: true,
    presence: 'away',
  },
  {
    id: 'd3',
    name: 'Carol White',
    subtitle: "Let's sync this week",
    timestamp: '3d',
    isDM: true,
    presence: 'offline',
  },
];

const meta: Meta<typeof ChannelList> = {
  title: 'Organisms/ChannelList',
  component: ChannelList,
  args: {
    channels: CHANNELS,
    onChannelPress: action('channel-pressed'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Channels: Story = {
  args: {
    channels: CHANNELS,
    sectionTitle: 'Channels',
  },
};

export const ChannelsWithSelection: Story = {
  args: {
    channels: CHANNELS,
    sectionTitle: 'Channels',
    selectedId: '1',
  },
};

export const DirectMessages: Story = {
  args: {
    channels: DMS,
    sectionTitle: 'Direct Messages',
  },
};

export const EmptyList: Story = {
  args: {
    channels: [],
    sectionTitle: 'Channels',
  },
};
