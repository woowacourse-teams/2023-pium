import type { Meta, StoryObj } from '@storybook/react';
import ImageButton from '.';
import useFileUpload from '../../../hooks/common/useFileUpload';
import ToastList from '../Toast/ToastList';

const meta: Meta<typeof ImageButton> = {
  component: ImageButton,
  decorators: [
    (Story) => {
      return (
        <>
          <Story />
          <ToastList />
        </>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof ImageButton>;

const DefaultImageButton = () => {
  const { fileUploadHandler, uploadedImageUrl, imgRef } = useFileUpload({});

  return (
    <div>
      <img src={uploadedImageUrl} alt="file" />
      <ImageButton ref={imgRef} changeCallback={fileUploadHandler} />
    </div>
  );
};

export const Default: Story = {
  render: DefaultImageButton,
};
