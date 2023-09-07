import { useRef, useState } from 'react';
import useAddToast from 'hooks/useAddToast';
import basicImage from 'assets/piumi-emotionless.svg';

interface FileUploadParams {
  imageUrl?: string;
}

const useFileUpload = ({ imageUrl = `${basicImage}` }: FileUploadParams) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(imageUrl);
  const imgRef = useRef<HTMLInputElement>(null);
  const addToast = useAddToast();
  const allowedExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/heic'];

  const fileUploadHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.currentTarget.files;

    if (files && files.length > 0) {
      const firstFile = files[0];

      if (firstFile.size > 10000000) {
        addToast('warning', '10MB 이하로 입력해주세요');
        if (imgRef.current) {
          imgRef.current.value = '';
        }

        return;
      }

      if (!allowedExtensions.includes(firstFile.type)) {
        addToast(
          'warning',
          '지원하지 않는 확장자 입니다!jpg, jpeg, png, heic 확장자를 사용해주세요'
        );
        if (imgRef.current) {
          imgRef.current.value = '';
        }

        return;
      }

      const fileUrl = URL.createObjectURL(firstFile);
      setUploadedImageUrl(fileUrl);
    }
  };

  return { fileUploadHandler, uploadedImageUrl, imgRef };
};

export default useFileUpload;
