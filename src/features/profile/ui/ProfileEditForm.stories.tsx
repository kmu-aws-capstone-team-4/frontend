import type { Meta } from '@storybook/react';
import { ProfileEditForm } from './ProfileEditForm';
import { ToastProvider } from '@/shared/ui/Toast';

const meta = {
  title: 'Features/Profile/ProfileEditForm',
  component: ProfileEditForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <><ToastProvider /><Story /></>],
} satisfies Meta<typeof ProfileEditForm>;
export default meta;

export const Default = {
  render: () => <ProfileEditForm />,
};
