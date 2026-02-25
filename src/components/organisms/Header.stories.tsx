import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    transparent: { control: 'boolean' },
  },
  args: {
    title: '# general',
    transparent: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: '# general' },
};

export const WithSubtitle: Story = {
  args: {
    title: '# general',
    subtitle: '42 members',
  },
};

export const WithBackButton: Story = {
  args: {
    title: '# engineering',
    subtitle: '18 members',
    leftAction: {
      label: 'Back',
      onPress: action('back-pressed'),
    },
  },
};

export const WithActions: Story = {
  args: {
    title: '# design',
    subtitle: '8 members',
    leftAction: {
      label: 'Back',
      onPress: action('back-pressed'),
    },
    rightActions: [
      { label: 'Search', onPress: action('search-pressed') },
      { label: 'More', onPress: action('more-pressed') },
    ],
  },
};

export const DirectMessage: Story = {
  args: {
    title: 'Alice Johnson',
    subtitle: 'Active now',
    leftAction: {
      label: 'Back',
      onPress: action('back-pressed'),
    },
    rightActions: [{ label: 'Call', onPress: action('call-pressed') }],
  },
};
