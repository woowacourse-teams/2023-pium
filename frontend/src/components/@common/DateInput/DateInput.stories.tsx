import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ToastList from 'components/@common/Toast/ToastList';
import ToastProvider from 'contexts/toastContext';
import { getDateToString, getParticularDateFromSpecificDay, getStringToDate } from 'utils/date';
import DateInput from '.';

const meta: Meta<typeof DateInput> = {
  component: DateInput,
  decorators: [
    (Story) => {
      return (
        <ToastProvider>
          <Story />
          <ToastList />
        </ToastProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(getDateToString);
    const changeHandler = (val: string) => {
      setValue(val);
      return true;
    };
    return <DateInput value={value} changeCallback={changeHandler} />;
  },
};

export const HasRange: Story = {
  render: () => {
    const today = getDateToString();
    const [value, setValue] = useState(today);
    const changeHandler = (val: string) => {
      setValue(val);
      return true;
    };

    return (
      <DateInput
        value={value}
        changeCallback={changeHandler}
        min={getParticularDateFromSpecificDay(-7, getStringToDate(value))}
        max={getParticularDateFromSpecificDay(7, getStringToDate(value))}
      />
    );
  },
};
