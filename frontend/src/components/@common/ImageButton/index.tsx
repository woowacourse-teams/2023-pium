import { forwardRef } from 'react';
import type { CSSProp } from 'styled-components';
import { FileInput, Wrapper } from './ImageButton.style';
import theme from 'style/theme.style';
import CirclePlus from '../Icons/CirclePuls';

interface ImageButtonProps {
  changeCallback: React.ChangeEventHandler<HTMLInputElement>;
  customCss?: CSSProp;
}

const ImageButton = forwardRef<HTMLInputElement, ImageButtonProps>(function ImageButton(
  { changeCallback, customCss },
  ref
) {
  return (
    <Wrapper customCss={customCss}>
      <label htmlFor="customImage">
        <CirclePlus color={theme.color.primary} />
      </label>
      <FileInput
        ref={ref}
        type="file"
        id="customImage"
        onChange={changeCallback}
        accept="image/*"
      />
    </Wrapper>
  );
});

export default ImageButton;
