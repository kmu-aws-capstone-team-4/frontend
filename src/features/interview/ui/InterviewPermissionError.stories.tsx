import type { Meta } from '@storybook/react';
import { InterviewPermissionError } from './InterviewPermissionError';

const meta = {
  title: 'Features/Interview/InterviewPermissionError',
  component: InterviewPermissionError,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof InterviewPermissionError>;
export default meta;

export const Default = {
  args: {
    permissions: { camera: false, mic: false, gpu: true },
    onRetry: () => console.log('Retry permissions'),
    onEnd: () => console.log('End interview'),
  },
};

export const AllBlocked = {
  args: {
    permissions: { camera: false, mic: false, gpu: false },
    onRetry: () => console.log('Retry'),
    onEnd: () => console.log('End'),
  },
};
