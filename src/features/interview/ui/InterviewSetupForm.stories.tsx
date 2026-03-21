import type { Meta } from '@storybook/react';
import { InterviewSetupForm } from './InterviewSetupForm';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Features/Interview/InterviewSetupForm',
  component: InterviewSetupForm,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="bg-bg min-h-screen p-8">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof InterviewSetupForm>;
export default meta;

export const Default = {
  args: {
    currentStep: 1,
    onStart: (s: Record<string, unknown>) => console.log('Start:', s),
    onBack: () => console.log('Back'),
  },
};
