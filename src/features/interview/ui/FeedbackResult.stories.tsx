import type { Meta, StoryObj } from '@storybook/react';
import { FeedbackResult } from './FeedbackResult';

const meta = {
  title: 'Features/Interview/FeedbackResult',
  component: FeedbackResult,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedbackResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HighScore: Story = {
  args: {
    result: {
      score: 85,
      feedback: '훌륭합니다! 전반적으로 시선 처리가 안정적이었으며, 답변의 속도와 크기도 적절했습니다. 자신감 있는 태도가 매우 인상적입니다.',
      followUpQuestion: '이전에 팀원과 갈등이 있었을 때 어떻게 해결하셨나요?',
      fps: 30,
    },
    onClose: () => console.log('Close clicked'),
  },
};

export const MediumScore: Story = {
  args: {
    result: {
      score: 55,
      feedback: '무난한 답변이었습니다. 다만, 중간에 시선이 자주 흔들리고 "어..."와 같은 불필요한 단어 사용이 있었습니다. 조금 더 명확하게 답변해보세요.',
      followUpQuestion: '새로운 기술을 학습할 때 본인만의 노하우가 있다면 무엇인가요?',
      fps: 28,
    },
    onClose: () => console.log('Close clicked'),
  },
};

export const LowScore: Story = {
  args: {
    result: {
      score: 30,
      feedback: '실전 환경에 대한 연습이 더 필요해 보입니다. 카메라를 응시하지 않는 빈도가 높았고, 목소리 크기가 다소 작아 전달력이 떨어집니다. 긴장을 풀고 천천히 다시 시도해보세요.',
      fps: 24,
    },
    onClose: () => console.log('Close clicked'),
  },
};
