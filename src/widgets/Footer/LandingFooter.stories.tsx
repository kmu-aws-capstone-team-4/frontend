import type { Meta } from '@storybook/react';
import { LandingFooter } from './LandingFooter';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Widgets/LandingFooter',
  component: LandingFooter,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="bg-bg font-inter">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof LandingFooter>;
export default meta;

export const Default = {
  render: () => <LandingFooter />,
};
