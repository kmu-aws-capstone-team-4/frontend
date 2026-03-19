import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Shared/UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fallbackName: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=68',
    fallbackName: 'Jane Smith',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" fallbackName="Small Avatar" />
      <Avatar size="md" fallbackName="Medium Avatar" />
      <Avatar size="lg" fallbackName="Large Avatar" />
      <Avatar size="xl" fallbackName="Extra Large" />
    </div>
  ),
};
