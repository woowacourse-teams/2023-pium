import type { Meta, StoryObj } from '@storybook/react';
import DateInput from 'components/DateInput';
import { getToday } from 'utils/date';
import FormInputBox from '.';

const meta: Meta<typeof FormInputBox> = {
  component: FormInputBox,
};

export default meta;

type Story = StoryObj<typeof FormInputBox>;

export const Default: Story = {
  args: {
    title: '무엇을 입력해볼까요?',
  },
  render: ({ ...args }) => {
    return (
      <FormInputBox {...args}>
        <input type="number" inputMode="numeric" pattern="\d*" max={365} min={1} required />
      </FormInputBox>
    );
  },
};

export const ChildrenDateInput: Story = {
  args: {
    title: '마지막으로 물을 준 날짜가 언제인가요?',
  },
  render: ({ ...args }) => {
    return (
      <FormInputBox {...args}>
        <DateInput initialValue={getToday()} />
      </FormInputBox>
    );
  },
};
