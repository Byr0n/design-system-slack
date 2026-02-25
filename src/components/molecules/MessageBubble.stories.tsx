import type { Meta, StoryObj } from '@storybook/react-native';
import { MessageBubble } from './MessageBubble';

const meta: Meta<typeof MessageBubble> = {
  title: 'Molecules/MessageBubble',
  component: MessageBubble,
  argTypes: {
    variant: {
      control: 'select',
      options: ['sent', 'received'],
    },
    message: { control: 'text' },
    senderName: { control: 'text' },
    timestamp: { control: 'text' },
    showAvatar: { control: 'boolean' },
    showSenderName: { control: 'boolean' },
    isEdited: { control: 'boolean' },
  },
  args: {
    message: 'Hey team! Has anyone reviewed the latest design?',
    senderName: 'Alice Johnson',
    timestamp: '12:30',
    variant: 'received',
    showAvatar: true,
    showSenderName: true,
    isEdited: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Received: Story = {
  args: {
    variant: 'received',
    message: 'Hey team! Has anyone reviewed the latest design?',
    senderName: 'Alice Johnson',
    timestamp: '12:30',
  },
};

export const Sent: Story = {
  args: {
    variant: 'sent',
    message: "Yes, looks great! I left some comments on Figma.",
    senderName: 'Me',
    timestamp: '12:31',
  },
};

export const LongMessage: Story = {
  args: {
    variant: 'received',
    message:
      "I've been thinking about the onboarding flow and I think we should simplify it. The current version has too many steps and I'm seeing a high drop-off rate in the analytics. Let me put together a proposal.",
    senderName: 'Bob Smith',
    timestamp: '10:15',
  },
};

export const WithReactions: Story = {
  args: {
    variant: 'received',
    message: 'Just shipped the new feature! 🚀',
    senderName: 'Carol White',
    timestamp: '14:00',
    reactions: [
      { emoji: '🎉', count: 4 },
      { emoji: '👍', count: 3 },
      { emoji: '🚀', count: 2 },
    ],
  },
};

export const Edited: Story = {
  args: {
    variant: 'sent',
    message: 'I meant to say: meeting at 3pm, not 2pm.',
    timestamp: '09:45',
    isEdited: true,
  },
};

export const NoAvatarOrName: Story = {
  args: {
    variant: 'received',
    message: 'This is a follow-up message from the same person.',
    senderName: 'Alice Johnson',
    timestamp: '12:32',
    showAvatar: false,
    showSenderName: false,
  },
};
