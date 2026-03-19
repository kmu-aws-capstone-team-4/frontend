import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider } from '@/shared/ui/Toast/ToastProvider';
import { useToast } from '@/shared/ui/Toast/useToast';
import { Button } from '@/shared/ui/Button';

const meta = {
  title: 'Shared/UI/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToastTrigger = () => {
  const { addToast } = useToast();

  return (
    <div className="flex flex-col gap-4 items-center">
      <ToastProvider />
      <Button onClick={() => addToast({ type: 'success', title: 'Success', message: 'Operation completed successfully.' })}>
        Show Success Toast
      </Button>
      <Button onClick={() => addToast({ type: 'error', title: 'Error', message: 'Something went wrong.' })} variant="danger">
        Show Error Toast
      </Button>
      <Button onClick={() => addToast({ type: 'info', message: 'Just a quick piece of information.' })} variant="secondary">
        Show Info Toast (No Title)
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: () => <ToastTrigger />,
};
