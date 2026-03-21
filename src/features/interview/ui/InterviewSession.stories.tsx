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
  args: {
    onEnd: () => console.log('End interview'),
    questionNumber: 3,
    questionLabel: '꼬리 질문',
    questionText: '방금 말씀하신 프로젝트에서 가장 어려웠던 기술적 문제는 무엇이었나요?',
  },
};
