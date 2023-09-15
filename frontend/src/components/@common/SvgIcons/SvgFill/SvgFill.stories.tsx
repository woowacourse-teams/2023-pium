import type { Meta, StoryObj } from '@storybook/react';
import theme from 'style/theme.style';
import { ICONS } from '.';
import SvgFill from '.';

const meta: Meta<typeof SvgFill> = {
  component: SvgFill,
  args: {
    size: 24,
    color: theme.color.gray,
  },
};

export default meta;

type Story = StoryObj<typeof SvgFill>;

export const Default: Story = {
  render: () => {
    return (
      <>
        {ICONS.map((icon) => (
          <SvgFill key={icon} icon={icon} />
        ))}
      </>
    );
  },
};
