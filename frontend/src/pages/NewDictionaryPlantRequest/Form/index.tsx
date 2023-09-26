import { useState, useRef } from 'react';
import FormInput from 'components/@common/FormInput';
import FormInputBox from 'components/@common/FormInputBox';
import {
  Form as StyledForm,
  HiddenInput,
  ImageContent,
  ImageName,
  SubmitButton,
  Thumbnail,
  UploadButton,
} from './Form.style';
import useAddToast from 'hooks/common/useAddToast';
import useDictionaryPlantRegister from 'hooks/queries/dictionaryPlantRegistration/useDictionaryPlantRegister';
import { getFirstImage, getImageUrl, isAllowedImageExtension } from 'utils/image';
import { NUMBER } from 'constants/index';

interface FormProps {
  initialName?: string;
}

const INVALID_FORM_MESSAGE = '이름과 사진 중 적어도 하나는 넣어 주세요.';

const Form = (props: FormProps) => {
  const { initialName } = props;

  const [image, setImage] = useState<File | null>(null);
  const [plantName, setPlantName] = useState(initialName ?? '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addToast = useAddToast();
  const { mutate } = useDictionaryPlantRegister();

  const accessFileInput = () => {
    fileInputRef.current?.click();
  };

  const isFormValid = () => plantName.trim().length > 0 || image !== null;

  const submitIfValid: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    const form = image ? { image, name: plantName } : { name: plantName };
    mutate(form);
  };

  const setImageIfValid: React.ChangeEventHandler<HTMLInputElement> = ({ target: { files } }) => {
    if (!files || files.length === 0) {
      setImage(null);
      return;
    }

    const firstImage = getFirstImage(files);
    if (!firstImage) addToast('warning', '5MB 이하의 사진을 올려주세요!');
    if (firstImage && !isAllowedImageExtension(firstImage)) {
      addToast('warning', '지원하지 않는 확장자입니다!');
      return;
    }
    setImage(firstImage ? firstImage : image);
  };

  const isValidForm = isFormValid();

  return (
    <StyledForm>
      <FormInputBox
        title="(선택) 식물 이름을 입력해주세요."
        status={isValidForm ? 'default' : 'error'}
        error={INVALID_FORM_MESSAGE}
      >
        <FormInput
          type="text"
          value={plantName}
          onChange={({ target: { value } }) => {
            setPlantName(value.slice(0, NUMBER.maxNicknameLength));
          }}
        />
      </FormInputBox>
      <FormInputBox
        title="(선택) 식물 사진을 올려주세요(최대 5MB)."
        status={isValidForm ? 'default' : 'error'}
        error={INVALID_FORM_MESSAGE}
      >
        <HiddenInput ref={fileInputRef} type="file" accept="image/*" onChange={setImageIfValid} />
        <ImageContent>
          <UploadButton type="button" aria-label="사진 등록하기" onClick={accessFileInput}>
            {image ? (
              <Thumbnail src={getImageUrl(image)} alt={image.name} />
            ) : (
              '사진 등록하기 (jpg, jpeg, png, heic)'
            )}
          </UploadButton>
          <ImageName>{image ? image.name : '아직 사진을 올리지 않았어요.'}</ImageName>
        </ImageContent>
      </FormInputBox>

      <SubmitButton type="submit" onClick={submitIfValid} disabled={!isValidForm}>
        제출하기
      </SubmitButton>
    </StyledForm>
  );
};

export default Form;
