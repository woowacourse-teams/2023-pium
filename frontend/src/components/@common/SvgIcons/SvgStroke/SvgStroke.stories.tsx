import type { Meta, StoryObj } from '@storybook/react';
import theme from 'style/theme.style';
import { ICONS } from '.';
import SvgStroke from '.';

const meta: Meta<typeof SvgStroke> = {
  component: SvgStroke,
  args: {
    size: 24,
    color: theme.color.gray,
  },
};

export default meta;

type Story = StoryObj<typeof SvgStroke>;

export const Default: Story = {
  render: () => {
    return (
      <>
        {ICONS.map((icon) => (
          <SvgStroke key={icon} icon={icon} />
        ))}
      </>
    );
  },
};
