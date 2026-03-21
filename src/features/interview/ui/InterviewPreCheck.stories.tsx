import type { Meta } from '@storybook/react';
import { InterviewPreCheck } from './InterviewPreCheck';

const meta = {
  title: 'Features/Interview/InterviewPreCheck',
  component: InterviewPreCheck,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-bg min-h-screen p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InterviewPreCheck>;
export default meta;

export const Default = {
  args: {
    currentStep: 2,
    onNext: () => console.log('Next: start interview'),
    onBack: () => console.log('Back to setup'),
  },
};
