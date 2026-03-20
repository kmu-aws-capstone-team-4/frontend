import type { Meta } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Shared/UI/PageHeader',
  component: PageHeader,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
} satisfies Meta<typeof PageHeader>;
export default meta;

export const Default = {
  args: {
    title: '이력서 관리',
    subtitle: '면접에 사용할 이력서를 등록하고 관리합니다.',
  },
};

export const WithSteps = {
  args: {
    title: '면접 설정',
    subtitle: '질문 유형과 이력서를 선택하세요.',
    step: 2,
    totalSteps: 3,
  },
};
