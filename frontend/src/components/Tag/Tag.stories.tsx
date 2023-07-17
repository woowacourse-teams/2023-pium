import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Tag, { TagProps } from '.';

const meta: Meta<typeof Tag> = {
  component: Tag,

  args: {
    variant: 'default',
    dimmed: true,
    hasHoverEffect: false,
  },

  argTypes: {
    variant: { description: '색깔 고르기' },
    dimmed: { description: '흐리무리하게 할까요?' },
    hasHoverEffect: { description: '마우스를 올리면 색을 살짝 바꿀까요?' },
  },

  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  render: () => (
    <Tag variant="default" dimmed>
      식물을 쉽게, 피움.
    </Tag>
  ),
};

const Wrapper = (props: TagProps) => {
  const { dimmed = true, hasHoverEffect = false, variant = 'default' } = props;

  const [content, setContent] = useState('사실 없어요 ㅎㅎ');

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <Tag variant={variant} dimmed={dimmed} hasHoverEffect={hasHoverEffect}>
          {content}
        </Tag>
      </div>

      <label
        htmlFor="Tag component input test"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        입력하고픈 내용이 있나요?
        <input
          type="text"
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
        />
      </label>
    </>
  );
};

export const Playground: Story = {
  argTypes: {
    variant: { control: 'radio' },
    dimmed: { control: 'boolean' },
    hasHoverEffect: { control: 'boolean' },
  },

  render: (args) => <Wrapper {...args} />,
};
