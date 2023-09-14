interface OptimizeImageParams {
  targetFile: File | Blob;
  resolveCallback: (blob: Blob) => void;
  width: number;
  height: number;
}

function calculateSize(img: HTMLImageElement, maxWidth: number, maxHeight: number) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

/**
 *
 * @param {
 *  targetFile, 압축하고자 하는 파일
 *  resolveCallback, 압축이 완료되고 난 다음에 실행될 callback. 주로 파일 압축 후 해당 blob을 반환받는 형식이다.
 *  width, 압축을 적용할  최대 width
 *  height 압축을 적용할 최대 height
 * }
 *
 */

const optimizeImage = ({ targetFile, resolveCallback, width, height }: OptimizeImageParams) => {
  const canvasRef = document.createElement('canvas');
  const blobUrl = URL.createObjectURL(targetFile);

  const imageForDrawing = new Image();
  imageForDrawing.src = blobUrl;

  imageForDrawing.onerror = () => {
    URL.revokeObjectURL(blobUrl);
    throw new Error('압축할 수 없는 이미지입니다.');
  };

  imageForDrawing.onload = () => {
    URL.revokeObjectURL(blobUrl);

    const [newWidth, newHeight] = calculateSize(imageForDrawing, width, height);

    canvasRef.width = newWidth;
    canvasRef.height = newHeight;

    const ctx = canvasRef.getContext('2d');
    ctx?.drawImage(imageForDrawing, 0, 0, newWidth, newHeight);

    return new Promise((resolve) => {
      canvasRef.toBlob((blob) => {
        if (blob) {
          resolve(resolveCallback(blob));
        }
      }, targetFile.type);
    });
  };
};

export default optimizeImage;
