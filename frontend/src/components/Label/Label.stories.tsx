import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Label, { LabelProps } from '.';

const meta: Meta<typeof Label> = {
  component: Label,

  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <Label variant="default" dimmed>
      식물을 쉽게, 피움.
    </Label>
  ),
};

const Wrapper = (props: LabelProps) => {
  const { dimmed = true, hasHoverEffect = false, variant = 'default' } = props;

  const [content, setContent] = useState('사실 없어요 ㅎㅎ');

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <Label variant={variant} dimmed={dimmed} hasHoverEffect={hasHoverEffect}>
          {content}
        </Label>
      </div>

      <label
        htmlFor="Label component input test"
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
  args: {
    variant: 'default',
    dimmed: true,
    hasHoverEffect: false,
  },

  argTypes: {
    variant: { control: 'radio' },
    dimmed: { control: 'boolean' },
    hasHoverEffect: { control: 'boolean' },
  },

  render: (args) => <Wrapper {...args} />,
};
