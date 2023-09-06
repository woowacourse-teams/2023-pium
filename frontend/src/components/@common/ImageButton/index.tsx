import { FileInput } from './ImageButton.style';
import theme from 'style/theme.style';
import CirclePlus from '../Icons/CirclePuls';

interface ImageButtonProps {
  changeCallback: React.ChangeEventHandler<HTMLInputElement>;
}

const ImageButton = ({ changeCallback }: ImageButtonProps) => {
  return (
    <div>
      <label htmlFor="customImage">
        <CirclePlus width="60px" height="60px" color={theme.color.primary} />
      </label>
      <FileInput type="file" id="customImage" onChange={changeCallback} accept="image/*" />
    </div>
  );
};

export default ImageButton;
