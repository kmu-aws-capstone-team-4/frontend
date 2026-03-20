import type { Meta } from '@storybook/react';
import { ResumeList } from './ResumeList';

const meta = {
  title: 'Features/Resume/ResumeList',
  component: ResumeList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[600px] font-inter"><Story /></div>],
} satisfies Meta<typeof ResumeList>;
export default meta;

export const Default = {
  render: () => <ResumeList />,
};
