import type { Meta, StoryObj } from '@storybook/react';
import ImageButton from '.';
import useFileUpload from './hooks/useFileUpload';

const meta: Meta<typeof ImageButton> = {
  component: ImageButton,
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
