import { useState } from 'react';
import basicImage from 'assets/piumi-emotionless.svg';

interface FileUploadParams {
  imageUrl?: string;
}

const useFileUpload = ({ imageUrl = `${basicImage}` }: FileUploadParams) => {
  const [file, setFile] = useState<File>();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(imageUrl);

  const fileUploadHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.currentTarget.files;

    if (files) {
      const firstFile = files[0];
      setFile(firstFile);
      const fileUrl = URL.createObjectURL(firstFile);
      setUploadedImageUrl(fileUrl);
    }
  };

  return { file, fileUploadHandler, uploadedImageUrl };
};

export default useFileUpload;
