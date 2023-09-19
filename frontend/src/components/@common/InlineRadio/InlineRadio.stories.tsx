import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import InlineRadio from '.';

const meta: Meta<typeof InlineRadio> = {
  component: InlineRadio,

  argTypes: {
    name: { description: '각 radio input을 하나로 묶을 이름' },
    value: { description: 'useState의 상태 값' },
    setValue: { description: 'useState의 상태 설정 함수' },
  },
};

export default meta;

type Story = StoryObj<typeof InlineRadio>;

const Wrapper = () => {
  const [value, setValue] = useState('겨울');

  return (
    <InlineRadio name="seasons" value={value} setValue={setValue}>
      <InlineRadio.Option value="봄" />
      <span>|</span>
      <InlineRadio.Option value="여름" />
      <span>|</span>
      <InlineRadio.Option value="가을" />
      <span>|</span>
      <InlineRadio.Option value="겨울" />
    </InlineRadio>
  );
};

export const Default: Story = {
  render: () => <Wrapper />,
};
