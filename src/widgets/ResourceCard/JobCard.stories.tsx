import type { Meta } from '@storybook/react';
import { JobCard } from './JobCard';

const meta = {
  title: 'Widgets/JobCard',
  component: JobCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[600px] font-inter"><Story /></div>],
} satisfies Meta<typeof JobCard>;
export default meta;

export const Planned = {
  args: {
    title: '프론트엔드 개발자 (React)',
    company: '(주)테크컴퍼니',
    status: '지원 예정' as const,
    deadline: '2026-04-15',
  },
};

export const Applied = {
  args: {
    title: '백엔드 엔지니어 (Java)',
    company: '스타트업A',
    status: '지원 완료' as const,
    deadline: '2026-03-30',
  },
};

export const Analyzing = {
  args: {
    title: 'AI/ML Engineer',
    company: 'AI스타트업',
    status: '분석 중' as const,
    deadline: '2026-04-01',
  },
};

export const Saved = {
  args: {
    title: 'DevOps Engineer',
    company: '클라우드컴퍼니',
    status: '관심 저장' as const,
    deadline: '2026-05-01',
  },
};
