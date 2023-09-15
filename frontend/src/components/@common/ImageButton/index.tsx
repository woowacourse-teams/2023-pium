import { forwardRef, useId } from 'react';
import type { CSSProp } from 'styled-components';
import { FileInput, Wrapper } from './ImageButton.style';
import theme from 'style/theme.style';
import CirclePlus from '../Icons/CirclePuls';

interface ImageButtonProps {
  changeCallback: React.ChangeEventHandler<HTMLInputElement>;
  customCss?: CSSProp;
  size?: number;
  customId?: string;
}

const ImageButton = forwardRef<HTMLInputElement, ImageButtonProps>(function ImageButton(
  { changeCallback, size = 24, customId, customCss },
  ref
) {
  const customImage = useId();
  return (
    <Wrapper size={size} customCss={customCss} aria-label="이미지 등록 컨테이너">
      <label htmlFor={customId ?? customImage}>
        <CirclePlus
          color={theme.color.primary}
          width={size}
          height={size}
          aria-label="플러스 아이콘"
        />
      </label>
      <FileInput
        ref={ref}
        type="file"
        id={customId ?? customImage}
        onChange={changeCallback}
        accept="image/*"
      />
    </Wrapper>
  );
});

export default ImageButton;
