import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    errorText: { control: 'text' },
    required: { control: 'boolean' },
    editable: { control: 'boolean' },
    secureTextEntry: { control: 'boolean' },
  },
  args: {
    label: 'Full name',
    placeholder: 'Enter your full name',
    required: false,
    editable: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled(props: React.ComponentProps<typeof FormField>) {
  const [value, setValue] = useState('');
  return <FormField {...props} value={value} onChangeText={setValue} />;
}

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: { label: 'Full name', placeholder: 'John Doe' },
};

export const Required: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    required: true,
    hint: "We'll never share your email.",
  },
};

export const WithHint: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: 'Display name',
    placeholder: 'How you appear to teammates',
    hint: 'This is shown in messages and mentions',
  },
};

export const WithError: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    secureTextEntry: true,
    errorText: 'Password must be at least 8 characters',
  },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: 'Workspace URL',
    value: 'my-team.slack.com',
    editable: false,
    hint: 'Contact an admin to change the workspace URL',
  },
};
