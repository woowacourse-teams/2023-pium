import type { Meta, StoryObj } from '@storybook/react';
import { Link, MemoryRouter } from 'react-router-dom';
import DictionaryDetail from '.';

const meta: Meta<typeof DictionaryDetail> = {
  component: DictionaryDetail,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DictionaryDetail>;

export const Default: Story = {
  render: () => {
    return (
      <div>
        <Link to="/dict/1">이동</Link>
      </div>
    );
  },
};
