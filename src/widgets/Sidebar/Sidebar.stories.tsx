import type { Meta } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Widgets/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/dashboard']}>
        <div className="h-screen bg-bg font-inter flex">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Sidebar>;
export default meta;

export const Default = {
  render: () => <Sidebar />,
};
