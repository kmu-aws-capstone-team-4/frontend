import type { Meta } from '@storybook/react';
import { InterviewScreenError } from './InterviewScreenError';

const meta = {
  title: 'Features/Interview/InterviewScreenError',
  component: InterviewScreenError,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof InterviewScreenError>;
export default meta;

export const Default = {
  args: {
    onHome: () => console.log('Go home'),
    minWidth: 1024,
    minHeight: 768,
  },
};
