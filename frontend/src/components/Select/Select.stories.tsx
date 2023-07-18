import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Select from '.';

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Minimal: Story = {
  args: {
    value: '선택해주세요',
    options: ['옵션1', '옵션2', '옵션3'],
  },
};

export const Genera: Story = {
  render: () => {
    const options = ['포도', '딸기', '사과'];
    const [value, setValue] = useState(options[0]);

    const onChange = (options: string) => {
      setValue(options);
    };

    return <Select value={value} options={options} onChange={onChange}></Select>;
  },
};
