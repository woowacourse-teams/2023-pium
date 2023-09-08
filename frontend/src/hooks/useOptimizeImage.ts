import { useRef, useState } from 'react';

interface OptimizeImageParams {
  pw: number;
  ph: number;
}

const useOptimizeImage = ({ pw, ph }: OptimizeImageParams) => {
  const [optimizedImage, setOptimizedImage] = useState<Blob>();
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));

  const executeOptimize = (targetFile: File) => {
    const blobUrl = URL.createObjectURL(targetFile);

    const imageForDrawing = new Image();
    imageForDrawing.src = blobUrl;

    imageForDrawing.onload = () => {
      URL.revokeObjectURL(blobUrl);
    };

    const ctx = canvasRef.current.getContext('2d');
    ctx?.drawImage(imageForDrawing, 0, 0, pw, ph);

    canvasRef.current.toBlob((blob) => {
      const newFile = new File([blob as Blob], '압축 이미지', {
        type: targetFile.type,
      });
      setOptimizedImage(newFile);
    });
  };

  return { executeOptimize, optimizedImage };
};

export default useOptimizeImage;
