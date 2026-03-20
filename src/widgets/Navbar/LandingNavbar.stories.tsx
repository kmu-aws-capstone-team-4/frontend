import type { Meta } from '@storybook/react';
import { LandingNavbar } from './LandingNavbar';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Widgets/LandingNavbar',
  component: LandingNavbar,
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
} satisfies Meta<typeof LandingNavbar>;
export default meta;

export const Default = {
  render: () => <LandingNavbar />,
};
