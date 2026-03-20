import type { Meta } from '@storybook/react';
import { ResumeItem } from './ResumeItem';

const meta = {
  title: 'Features/Resume/ResumeItem',
  component: ResumeItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[600px] font-inter"><Story /></div>],
} satisfies Meta<typeof ResumeItem>;
export default meta;

export const Active = {
  args: {
    title: '시니어 프론트엔드 이력서 (2025.03)',
    type: '파일 업로드',
    date: '2025-03-01',
    active: true,
    isDefault: true,
  },
};

export const Inactive = {
  args: {
    title: '신입 백엔드 이력서',
    meta: '직접 입력 · 분석 완료 · 2025-02-15',
    active: false,
  },
};

export const WithMeta = {
  args: {
    title: '포트폴리오 사이트',
    meta: 'URL 입력 · 분석 중',
    active: true,
  },
};
