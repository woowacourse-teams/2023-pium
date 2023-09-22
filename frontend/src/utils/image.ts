import { ALLOWED_IMAGE_EXTENSIONS, STATIC_BASE_URL } from 'constants/index';

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

/**
 * 주어진 url이 피움 서비스의 정적 자료 주소인지 확인합니다.
 * @param url 문자열
 * @returns 피움이 제공하는 정적 자료일 경우 `true`
 */
export const isServerStaticData = (url: string) => {
  const regex = new RegExp(`^${STATIC_BASE_URL}`);
  return regex.test(url);
};

const X_SMALL_WIDTH = 64;
const SMALL_WIDTH = 256;

/**
 * 피움 서비스의 정적 이미지 파일 네이밍 정책을 따르는
 * 알맞은 크기의 사진 url을 반환합니다.
 *
 * `size`가 64보다 작으면 x-small, 256보다 작으면 small 크기로 재조정된 사진 url을 반환합니다.
 *
 * @param url img src에 들어갈 수 있는 url. 확장자명으로 끝나야 제대로 작동합니다.
 * @param size 사진 픽셀 크기
 * @param extension 원하는 확장자
 * @returns 새로운 url
 */
export const getResizedImageUrl = (url: string, size: number, extension: 'png' | 'webp') => {
  const urlTokens = url.split('.');
  const originalExtension = urlTokens.pop();

  if (originalExtension === undefined) return '';

  if (size < X_SMALL_WIDTH) {
    urlTokens.push('x-small', extension);
  } else if (size < SMALL_WIDTH) {
    urlTokens.push('small', extension);
  } else {
    urlTokens.push(originalExtension);
  }

  return urlTokens.join('.');
};
