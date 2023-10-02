import type { Meta, StoryObj } from '@storybook/react';
import InstallPrompt from '.';

const meta: Meta<typeof InstallPrompt> = {
  component: InstallPrompt,
  decorators: [
    (Story) => {
      return (
        <>
          <Story />
        </>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof InstallPrompt>;

const DefaultInstallPrompt = () => {
  return <InstallPrompt />;
};

export const Default: Story = {
  render: DefaultInstallPrompt,
};
