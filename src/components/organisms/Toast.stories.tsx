import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../atoms/Button';
import { ToastProvider, useToast } from './Toast';

// Inner component that uses the hook — must be inside ToastProvider
function ToastTrigger({
  message,
  variant,
  position,
  duration,
  actionLabel,
}: {
  message: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  position?: 'top' | 'bottom';
  duration?: number;
  actionLabel?: string;
}) {
  const { show } = useToast();
  return (
    <Button
      label="Show Toast"
      onPress={() =>
        show({
          message,
          variant,
          position,
          duration,
          action: actionLabel ? { label: actionLabel, onPress: () => {} } : undefined,
        })
      }
    />
  );
}

function ToastStoryWrapper(props: React.ComponentProps<typeof ToastTrigger>) {
  return (
    <ToastProvider>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ToastTrigger {...props} />
      </View>
    </ToastProvider>
  );
}

const meta: Meta<typeof ToastTrigger> = {
  title: 'Organisms/Toast',
  component: ToastTrigger,
  argTypes: {
    message: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    position: {
      control: 'select',
      options: ['top', 'bottom'],
    },
    duration: { control: 'number' },
    actionLabel: { control: 'text' },
  },
  args: {
    message: 'Message sent!',
    variant: 'default',
    position: 'bottom',
    duration: 3000,
  },
  render: (args) => <ToastStoryWrapper {...args} />,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { message: 'Message sent!' },
};

export const Success: Story = {
  args: { message: 'Channel created successfully.', variant: 'success' },
};

export const Warning: Story = {
  args: { message: "You're approaching your message limit.", variant: 'warning' },
};

export const Danger: Story = {
  args: { message: 'Failed to send message. Try again.', variant: 'danger' },
};

export const Info: Story = {
  args: { message: 'A new version is available.', variant: 'info' },
};

export const TopPosition: Story = {
  args: { message: 'Notification from the top', position: 'top' },
};

export const WithAction: Story = {
  args: {
    message: 'Message deleted.',
    variant: 'default',
    duration: 5000,
    actionLabel: 'Undo',
  },
};

export const Persistent: Story = {
  args: {
    message: 'Connecting to workspace…',
    variant: 'warning',
    duration: 0,
  },
};
