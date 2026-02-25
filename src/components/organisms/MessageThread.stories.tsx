import type { Meta, StoryObj } from '@storybook/react-native';
import { MessageThread } from './MessageThread';
import type { Message } from './MessageThread';

const MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Good morning everyone! 👋',
    senderName: 'Alice Johnson',
    timestamp: '9:00 AM',
    isSelf: false,
    dateDivider: 'Today',
  },
  {
    id: '2',
    text: 'Morning Alice! Ready for the sprint review later?',
    senderName: 'Bob Smith',
    timestamp: '9:02 AM',
    isSelf: false,
  },
  {
    id: '3',
    text: 'Yes! Just finishing up the demo slides.',
    senderName: 'Me',
    timestamp: '9:03 AM',
    isSelf: true,
  },
  {
    id: '4',
    text: 'I reviewed the PR — looks solid! Just left a couple of minor comments.',
    senderName: 'Alice Johnson',
    timestamp: '9:05 AM',
    isSelf: false,
    reactions: [{ emoji: '👍', count: 2 }],
  },
  {
    id: '5',
    text: 'Thanks! I\'ll address them now.',
    senderName: 'Me',
    timestamp: '9:07 AM',
    isSelf: true,
  },
  {
    id: '6',
    text: 'Also, reminder: the all-hands is at 3pm in the main conference room.',
    senderName: 'Bob Smith',
    timestamp: '10:00 AM',
    isSelf: false,
    reactions: [{ emoji: '📅', count: 5 }, { emoji: '✅', count: 3 }],
  },
  {
    id: '7',
    text: 'Got it, thanks for the reminder!',
    senderName: 'Me',
    timestamp: '10:01 AM',
    isSelf: true,
    isEdited: true,
  },
];

const meta: Meta<typeof MessageThread> = {
  title: 'Organisms/MessageThread',
  component: MessageThread,
  args: {
    messages: MESSAGES,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortConversation: Story = {
  args: {
    messages: MESSAGES.slice(0, 3),
  },
};

export const SingleMessage: Story = {
  args: {
    messages: [MESSAGES[0]],
  },
};
