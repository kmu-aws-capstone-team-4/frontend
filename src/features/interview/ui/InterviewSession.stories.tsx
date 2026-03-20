import type { Meta } from '@storybook/react';
import { InterviewSession } from './InterviewSession';

const meta = {
  title: 'Features/Interview/InterviewSession',
  component: InterviewSession,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof InterviewSession>;
export default meta;

export const Default = {
  render: () => <InterviewSession onEnd={() => console.log('Interview ended')} />,
};
