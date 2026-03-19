import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Shared/UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  args: {
    className: 'w-[400px]',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-text-primary">Card Title</h3>
        <p className="text-text-secondary">This is a card component with some content inside it.</p>
      </div>
    ),
  },
};
