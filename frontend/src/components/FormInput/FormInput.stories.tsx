import type { Meta, StoryObj } from '@storybook/react';
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

    const nextCallback = () => console.log('clicked');

    return (
      <>
        <FormInput
          type="number"
          inputMode="numeric"
          max={365}
          min={1}
          nextCallback={nextCallback}
          onChangeCallback={changeCallback}
        />
        <FormInput onChangeCallback={changeCallback} />
      </>
    );
  },
};
