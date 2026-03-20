import type { Meta } from '@storybook/react';
import { StreaksDisplay } from './StreaksDisplay';

const meta = {
  title: 'Features/Profile/StreaksDisplay',
  component: StreaksDisplay,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof StreaksDisplay>;
export default meta;

export const Default = {
  args: { streakCount: 5 },
};

export const HighStreak = {
  args: { streakCount: 42 },
};

export const ZeroStreak = {
  args: { streakCount: 0 },
};
