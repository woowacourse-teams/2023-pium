import type { Meta, StoryObj } from '@storybook/react';
import useDateInput from 'hooks/useDateInput';
import DateInput from '.';

const meta: Meta<typeof DateInput> = {
  component: DateInput,
};

export default meta;

type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  render: () => {
    const { date, today, changeHandler } = useDateInput();

    return <DateInput value={date} max={today} onChange={changeHandler} />;
  },
};
