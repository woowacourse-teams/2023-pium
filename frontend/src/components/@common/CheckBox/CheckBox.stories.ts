import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-components';
import CheckBox from '.';

const meta: Meta<typeof CheckBox> = {
  component: CheckBox,
  args: {
    id: '1234',
  },
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {
  args: {
    id: '1234',
    fillStyle: css`
      width: 24px;
      height: 24px;
      color: ${(props) => props.theme.color.primary};
    `,
    emptyStyle: css`
      width: 24px;
      height: 24px;
      color: ${(props) => props.theme.color.grayLight};
    `,
  },
};
