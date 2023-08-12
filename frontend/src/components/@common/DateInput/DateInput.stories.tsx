import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ToastList from 'components/@common/Toast/ToastList';
import ToastProvider from 'contexts/toastContext';
import {
  getDateToString,
  getParticularDateFromSpecificDay,
  getStringToDate,
  isDateFormat,
} from 'utils/date';
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

const DefaultInput = () => {
  const [value, setValue] = useState(getDateToString);
  const changeHandler = (newValue: string) => {
    if (!isDateFormat(newValue)) return;
    setValue(newValue);
  };
  return <DateInput value={value} changeCallback={changeHandler} />;
};

export const Default: Story = {
  render: DefaultInput,
};

const RangeRestrictedInput = () => {
  const today = getDateToString();
  const [value, setValue] = useState(today);
  const changeHandler = (newValue: string) => {
    if (!isDateFormat(newValue)) return;
    setValue(newValue);
  };

  return (
    <DateInput
      value={value}
      changeCallback={changeHandler}
      min={getParticularDateFromSpecificDay(-7, getStringToDate(value))}
      max={getParticularDateFromSpecificDay(7, getStringToDate(value))}
    />
  );
};

export const HasRange: Story = {
  render: RangeRestrictedInput,
};
