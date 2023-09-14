import { ALLOWED_IMAGE_EXTENSIONS } from 'constants/index';

export const getFirstImage = (fileList: FileList, maxByteSize: File['size'] = 5_000_000) => {
  const firstImage = Array.from(fileList).find(
    (file) => /^image/.test(file.type) && file.size <= maxByteSize
  );
  return firstImage || null;
};

export const getImageUrl = (file: File) => {
  if (!/^image/.test(file.type)) throw new Error('file type is not image');
  return URL.createObjectURL(file);
};

export const isAllowedImageExtension = (file: File) =>
  ALLOWED_IMAGE_EXTENSIONS.includes(file.type.toLowerCase());
