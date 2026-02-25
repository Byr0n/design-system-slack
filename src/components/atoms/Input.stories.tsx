import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
    clearable: { control: 'boolean' },
    editable: { control: 'boolean' },
    secureTextEntry: { control: 'boolean' },
  },
  args: {
    size: 'md',
    placeholder: 'Type something…',
    clearable: false,
    editable: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled wrapper for interactive stories
function ControlledInput(props: React.ComponentProps<typeof Input>) {
  const [value, setValue] = useState(props.value ?? '');
  return <Input {...props} value={value} onChangeText={setValue} />;
}

export const Default: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { placeholder: 'Type something…' },
};

export const WithLabel: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { label: 'Email address', placeholder: 'you@example.com' },
};

export const WithHelperText: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Username',
    placeholder: 'john_doe',
    helperText: 'Only letters, numbers, and underscores',
  },
};

export const WithError: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    secureTextEntry: true,
    errorText: 'Password must be at least 8 characters',
  },
};

export const Clearable: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Search',
    placeholder: 'Search channels…',
    clearable: true,
    value: 'general',
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Read only',
    value: 'Cannot be edited',
    editable: false,
  },
};

export const Small: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { size: 'sm', placeholder: 'Small input' },
};

export const Large: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { size: 'lg', placeholder: 'Large input' },
};
