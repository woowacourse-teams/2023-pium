import type { Meta, StoryObj } from '@storybook/react';
import theme from 'style/theme.style';
import { ICONS } from '.';
import SvgIcons from '.';

const meta: Meta<typeof SvgIcons> = {
  component: SvgIcons,
  args: {
    size: 24,
    color: theme.color.gray,
  },
};

export default meta;

type Story = StoryObj<typeof SvgIcons>;

export const Default: Story = {
  render: () => {
    return (
      <>
        {ICONS.map((icon) => (
          <SvgIcons key={icon} icon={icon} />
        ))}
      </>
    );
  },
};
