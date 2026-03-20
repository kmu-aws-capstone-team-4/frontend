import type { Meta } from '@storybook/react';
import { InterviewSetupForm } from './InterviewSetupForm';

const meta = {
  title: 'Features/Interview/InterviewSetupForm',
  component: InterviewSetupForm,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[800px] mx-auto font-inter"><Story /></div>],
} satisfies Meta<typeof InterviewSetupForm>;
export default meta;

export const Default = {
  render: () => <InterviewSetupForm onStart={(data) => console.log('Start:', data)} />,
};
