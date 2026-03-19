import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Shared/UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  args: {
    className: 'w-[400px]',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: 'Description',
    defaultValue: 'Too short',
    error: 'Description must be at least 50 characters long.',
  },
};
