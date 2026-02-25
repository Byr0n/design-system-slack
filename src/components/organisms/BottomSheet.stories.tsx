import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet } from './BottomSheet';
import { Button } from '../atoms/Button';

const meta: Meta<typeof BottomSheet> = {
  title: 'Organisms/BottomSheet',
  component: BottomSheet,
  argTypes: {
    title: { control: 'text' },
    snapHeight: { control: 'text' },
  },
  args: {
    title: 'Settings',
    snapHeight: '50%',
    onClose: action('closed'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories use a controlled wrapper since visible is required
function BottomSheetDemo(props: Partial<React.ComponentProps<typeof BottomSheet>>) {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Button label="Open Bottom Sheet" onPress={() => setVisible(true)} />
      <BottomSheet
        visible={visible}
        onClose={() => setVisible(false)}
        title={props.title ?? 'Title'}
        snapHeight={props.snapHeight ?? '50%'}
      >
        <Text style={{ fontSize: 15 }}>
          Bottom sheet content. Swipe down or tap outside to dismiss.
        </Text>
      </BottomSheet>
    </View>
  );
}

export const Default: Story = {
  render: (args) => <BottomSheetDemo {...args} />,
  args: { title: 'Settings' },
};

export const Tall: Story = {
  render: (args) => <BottomSheetDemo {...args} />,
  args: { title: 'Notifications', snapHeight: '75%' },
};

export const Short: Story = {
  render: (args) => <BottomSheetDemo {...args} />,
  args: { title: 'Quick Action', snapHeight: '30%' },
};

export const NoTitle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button label="Open" onPress={() => setVisible(true)} />
        <BottomSheet visible={visible} onClose={() => setVisible(false)} snapHeight="40%">
          <Text style={{ fontSize: 15, textAlign: 'center' }}>
            A bottom sheet without a title bar.
          </Text>
        </BottomSheet>
      </View>
    );
  },
};
