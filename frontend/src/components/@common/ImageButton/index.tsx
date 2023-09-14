import { forwardRef, useId } from 'react';
import type { CSSProp } from 'styled-components';
import { FileInput, Wrapper } from './ImageButton.style';
import theme from 'style/theme.style';
import CirclePlus from '../Icons/CirclePuls';

interface ImageButtonProps {
  changeCallback: React.ChangeEventHandler<HTMLInputElement>;
  customCss?: CSSProp;
  size?: number;
}

const ImageButton = forwardRef<HTMLInputElement, ImageButtonProps>(function ImageButton(
  { changeCallback, size = 24, customCss },
  ref
) {
  const customImage = useId();
  return (
    <Wrapper size={size} customCss={customCss}>
      <label htmlFor={customImage}>
        <CirclePlus color={theme.color.primary} width={size} height={size} />
      </label>
      <FileInput
        ref={ref}
        type="file"
        id={customImage}
        onChange={changeCallback}
        accept="image/*"
      />
    </Wrapper>
  );
});

export default ImageButton;
