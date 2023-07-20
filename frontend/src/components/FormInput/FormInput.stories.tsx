import type { Meta, StoryObj } from '@storybook/react';
import useNumberInput from 'hooks/useNumberInput';
import { NUMBER } from 'constants/index';
import FormInput from '.';

const meta: Meta<typeof FormInput> = {
  component: FormInput,
};

export default meta;

type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  render: () => {
    const changeCallback: React.ChangeEventHandler<HTMLInputElement> = (e) =>
      console.log(e.target.value);

    return <FormInput onChange={changeCallback} />;
  },
};

export const NumberInput: Story = {
  render: () => {
    const { MAX_CYCLE_DATE, MIN_CYCLE_DATE } = NUMBER;

    const { numberValue, changeCallback, keyDownHandler } = useNumberInput({
      maxRange: MAX_CYCLE_DATE,
      minRange: MIN_CYCLE_DATE,
    });

    const nextCallback = () => console.log('clicked');

    return (
      <FormInput
        inputMode="numeric"
        value={numberValue}
        onKeyDown={keyDownHandler}
        nextCallback={nextCallback}
        onChange={({ target: { value } }) => changeCallback(value)}
      />
    );
  },
};
