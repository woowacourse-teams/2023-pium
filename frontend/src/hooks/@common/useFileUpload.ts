import { useMemo, useRef, useState } from 'react';
import useAddToast from 'hooks/@common/useAddToast';
import basicImage from 'assets/piumi-emotionless.png';

interface FileUploadParams {
  imageUrl?: string;
}

const MAX_FILE_CAPACITY = 10000000;
const ALLOWED_FILE_EXTENSIONS = ['image/jpg', 'image/jpeg', 'image/png', 'image/heic'];

const useFileUpload = ({ imageUrl = basicImage }: FileUploadParams) => {
  const [file, setFile] = useState<Blob | null>(null);

  const imgRef = useRef<HTMLInputElement>(null);
  const uploadedImageUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : imageUrl),
    [file, imageUrl]
  );
  const addToast = useAddToast();

  const fileUploadHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.currentTarget.files;

    if (files && files.length > 0) {
      const firstFile = files[0];

      if (firstFile.size > MAX_FILE_CAPACITY) {
        addToast({ type: 'warning', message: '10MB 이하로 입력해주세요' });

        if (imgRef.current) {
          imgRef.current.value = '';
        }

        setFile(null);
        return;
      }

      if (!ALLOWED_FILE_EXTENSIONS.includes(firstFile.type)) {
        addToast({ type: 'warning', message: '지원하지 않는 확장자 입니다!' });

        if (imgRef.current) {
          imgRef.current.value = '';
        }

        setFile(null);
        return;
      }

      setFile(firstFile);
    }
  };

  return {
    fileUploadHandler,
    uploadedImageUrl,
    imgRef,
    file,
  };
};

export default useFileUpload;
