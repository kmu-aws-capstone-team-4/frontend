import type { Meta } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { ToastProvider } from '@/shared/ui/Toast';

const meta = {
  title: 'Features/Auth/LoginForm',
  component: LoginForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <><ToastProvider /><Story /></>],
} satisfies Meta<typeof LoginForm>;
export default meta;

export const Default = {
  render: () => <LoginForm />,
};
