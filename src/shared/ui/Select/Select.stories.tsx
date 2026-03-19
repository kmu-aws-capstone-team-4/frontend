import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Shared/UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  args: {
    className: 'w-[300px]',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

export const Default: Story = {
  args: {
    options: mockOptions,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Select Fruit',
    options: mockOptions,
  },
};

export const WithError: Story = {
  args: {
    label: 'Select Fruit',
    options: mockOptions,
    error: 'Please select a valid option',
  },
};
