import type { Meta, StoryObj } from '@storybook/react';
import useNumberInput from 'hooks/useNumberInput';
import { NUMBER } from 'constants/index';
import FormInput from '.';

/**
 * 테두리는 가시성을 위해 추가하였습니다.
 *
 * 실제 컴포넌트에는 없어요!
 */
const meta: Meta<typeof FormInput> = {
  component: FormInput,
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid black' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  argTypes: {
    onChange: { action: '값이 바뀌었어요' },
  },
};

export const NumberInput: Story = {
  argTypes: {
    nextCallback: { action: '화살표 버튼을 눌렀어요' },
  },

  render: ({ nextCallback = () => console.log('clicked') }) => {
    const { minCycleDate, maxCycleDate } = NUMBER;

    const { numberValue, changeCallback, keyDownHandler } = useNumberInput({
      maxRange: maxCycleDate,
      minRange: minCycleDate,
    });

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
