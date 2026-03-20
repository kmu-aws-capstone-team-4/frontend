import type { Meta } from '@storybook/react';
import { ResumeUploadForm } from './ResumeUploadForm';
import { ToastProvider } from '@/shared/ui/Toast';

const meta = {
  title: 'Features/Resume/ResumeUploadForm',
  component: ResumeUploadForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <><ToastProvider /><Story /></>],
} satisfies Meta<typeof ResumeUploadForm>;
export default meta;

export const Default = {
  render: () => <ResumeUploadForm />,
};
