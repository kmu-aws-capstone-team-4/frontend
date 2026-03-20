import type { Meta } from '@storybook/react';
import { TopBar } from './TopBar';

const meta = {
  title: 'Widgets/TopBar',
  component: TopBar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TopBar>;
export default meta;

export const Default = {
  render: () => (
    <div className="bg-bg font-inter">
      <TopBar />
    </div>
  ),
};
