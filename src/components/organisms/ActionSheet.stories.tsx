import React, { useState } from 'react';
import { View } from 'react-native';
import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-native';
import { ActionSheet } from './ActionSheet';
import { Button } from '../atoms/Button';

function ActionSheetDemo(props: Partial<React.ComponentProps<typeof ActionSheet>>) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ alignItems: 'center' }}>
      <Button label="Open Action Sheet" onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        title={props.title}
        message={props.message}
        actions={props.actions ?? []}
        showCancel={props.showCancel ?? true}
        cancelLabel={props.cancelLabel}
      />
    </View>
  );
}

const meta: Meta<typeof ActionSheet> = {
  title: 'Organisms/ActionSheet',
  component: ActionSheet,
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    showCancel: { control: 'boolean' },
    cancelLabel: { control: 'text' },
  },
  args: {
    showCancel: true,
    onClose: action('closed'),
    actions: [],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageOptions: Story = {
  render: () => (
    <ActionSheetDemo
      title="Message Options"
      actions={[
        { label: 'Reply in thread', onPress: action('reply') },
        { label: 'Forward message', onPress: action('forward') },
        { label: 'Copy link', onPress: action('copy-link') },
        { label: 'Delete message', onPress: action('delete'), destructive: true },
      ]}
    />
  ),
};

export const ChannelOptions: Story = {
  render: () => (
    <ActionSheetDemo
      title="# general"
      message="Channel actions"
      actions={[
        { label: 'Mark as read', onPress: action('mark-read') },
        { label: 'Mute channel', onPress: action('mute') },
        { label: 'Leave channel', onPress: action('leave'), destructive: true },
      ]}
    />
  ),
};

export const FileOptions: Story = {
  render: () => (
    <ActionSheetDemo
      actions={[
        { label: 'Open', onPress: action('open') },
        { label: 'Download', onPress: action('download') },
        { label: 'Share', onPress: action('share') },
        { label: 'Delete', onPress: action('delete'), destructive: true },
      ]}
    />
  ),
};

export const WithDisabledAction: Story = {
  render: () => (
    <ActionSheetDemo
      title="Export options"
      actions={[
        { label: 'Export as CSV', onPress: action('csv') },
        { label: 'Export as PDF', onPress: action('pdf'), disabled: true },
        { label: 'Export all data', onPress: action('all'), destructive: true },
      ]}
    />
  ),
};

export const NoCancel: Story = {
  render: () => (
    <ActionSheetDemo
      title="Required action"
      actions={[
        { label: 'Accept terms', onPress: action('accept') },
        { label: 'Decline', onPress: action('decline'), destructive: true },
      ]}
      showCancel={false}
    />
  ),
};
