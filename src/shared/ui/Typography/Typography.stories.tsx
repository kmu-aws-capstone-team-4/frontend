import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
  title: 'Shared/UI/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello World',
    variant: 'body',
    color: 'primary',
    weight: 'normal',
  },
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="subtitle">Subtitle Example</Typography>
      <Typography variant="body">Body Example</Typography>
      <Typography variant="caption">Caption Example</Typography>
    </div>
  ),
};
