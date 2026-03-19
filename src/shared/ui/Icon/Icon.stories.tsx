import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { Home, User, Settings, CheckCircle, AlertTriangle } from 'lucide-react';

const meta = {
  title: 'Shared/UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Home,
    size: 24,
    className: 'text-text-primary',
  },
};

export const Examples = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Home} className="text-text-primary" />
      <Icon icon={User} className="text-text-secondary" />
      <Icon icon={Settings} className="text-text-muted" />
      <Icon icon={CheckCircle} className="text-success" />
      <Icon icon={AlertTriangle} className="text-warning" />
    </div>
  ),
};
