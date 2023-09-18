import { forwardRef, useId } from 'react';
import type { CSSProp } from 'styled-components';
import SvgFill from 'components/@common/SvgIcons/SvgFill';
import { FileInput, Wrapper } from './ImageButton.style';
import theme from 'style/theme.style';

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
        <SvgFill
          icon="add-circle"
          color={theme.color.primary}
          size={size}
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
