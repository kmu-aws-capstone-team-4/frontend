import type { Meta } from '@storybook/react';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useState } from 'react';
import { Button } from '@/shared/ui/Button';

const meta = {
  title: 'Shared/UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

const ModalWithTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Example Modal">
        <div className="flex flex-col gap-4">
          <p className="text-text-secondary">This is the content inside the modal. You can place anything here.</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const Default = {
  render: () => <ModalWithTrigger />,
};
