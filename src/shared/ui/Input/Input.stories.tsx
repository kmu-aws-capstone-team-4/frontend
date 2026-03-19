import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/shared/ui/Input/Input';

const meta = {
  title: 'Shared/UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {
    className: 'w-[300px]',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'user@example.com',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const WithError: Story = {
  args: {
    label: 'Username',
    defaultValue: 'invalid_user_!@#',
    error: 'Username can only contain letters and numbers.',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters long.',
  },
};
