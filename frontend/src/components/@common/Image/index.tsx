import { forwardRef, useRef } from 'react';
import type { StyledImageProps } from './Image.style';
import { StyledImage } from './Image.style';
import { getResizedImageUrl } from 'utils/image';
import sadpiumiPng from 'assets/sadpiumi-imageFail.png';

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> &
  Partial<StyledImageProps>;

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(props, ref) {
  const { type = 'circle', size = '77px', src = sadpiumiPng, ...imageProps } = props;

  const sizeValue = Number(size.slice(0, -2));
  const fallbackImages = useRef<string[]>([
    sadpiumiPng,
    src,
    getResizedImageUrl(src, sizeValue, 'png'),
    getResizedImageUrl(src, sizeValue, 'webp'),
  ]);

  const currentImage = fallbackImages.current[fallbackImages.current.length - 1];

  const setErrorImage: React.ReactEventHandler<HTMLImageElement> = ({ currentTarget }) => {
    fallbackImages.current.pop();
    currentTarget.src = fallbackImages.current[fallbackImages.current.length - 1];
  };

  return (
    <StyledImage
      ref={ref}
      type={type}
      size={size}
      onError={setErrorImage}
      loading="lazy"
      src={currentImage}
      {...imageProps}
    />
  );
});

export default Image;
