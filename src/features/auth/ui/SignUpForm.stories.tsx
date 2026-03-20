import type { Meta } from '@storybook/react';
import { SignUpForm } from './SignUpForm';
import { ToastProvider } from '@/shared/ui/Toast';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Features/Auth/SignUpForm',
  component: SignUpForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ToastProvider />
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof SignUpForm>;
export default meta;

export const Default = {
  render: () => <SignUpForm />,
};
