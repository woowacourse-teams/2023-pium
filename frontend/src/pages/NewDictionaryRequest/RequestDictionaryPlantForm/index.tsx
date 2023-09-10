import { useState, useRef } from 'react';
import FormInput from 'components/@common/FormInput';
import FormInputBox from 'components/@common/FormInputBox';
import {
  Form,
  HiddenInput,
  ImageContent,
  ImageName,
  SubmitButton,
  Thumbnail,
  UploadButton,
} from './RequestDictionaryPlantForm.style';

const MAX_IMAGE_BYTE_SIZE = 5_000_000;

interface RequestDictionaryPlantFormProps {
  initialName?: string;
}

const RequestDictionaryPlantForm = (props: RequestDictionaryPlantFormProps) => {
  const { initialName } = props;

  const [image, setImage] = useState<File | null>(null);
  const [plantName, setPlantName] = useState(initialName ?? '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const accessFileInput = () => {
    fileInputRef.current?.click();
  };

  const isFormValid = () => plantName.trim().length > 0 || image !== null;

  const submitIfValid: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    // todo: api 통신 로직
    alert('제출 성공?');
  };

  const getFirstImage = (fileList: FileList, maxSize: File['size'] = MAX_IMAGE_BYTE_SIZE) => {
    const firstImage = Array.from(fileList).find(
      (file) => /^image/.test(file.type) && file.size <= maxSize
    );
    return firstImage || null;
  };

  const getImageUrl = (file: File) => {
    if (!/^image/.test(file.type)) throw new Error('file type is not image');
    return URL.createObjectURL(file);
  };

  const setImageIfValid: React.ChangeEventHandler<HTMLInputElement> = ({ target: { files } }) => {
    setImage(files ? getFirstImage(files) : null);
  };

  return (
    <Form>
      <FormInputBox title="(선택) 식물 이름을 입력해주세요.">
        <FormInput
          type="text"
          value={plantName}
          onChange={({ target: { value } }) => {
            setPlantName(value.slice(0, 30));
          }}
        />
      </FormInputBox>
      <FormInputBox title="(선택) 식물 사진을 올려주세요(최대 5MB).">
        <HiddenInput ref={fileInputRef} type="file" accept="image/*" onChange={setImageIfValid} />
        <ImageContent>
          <UploadButton type="button" aria-label="사진 등록하기" onClick={accessFileInput}>
            {image ? <Thumbnail src={getImageUrl(image)} alt={image.name} /> : '사진 등록하기'}
          </UploadButton>
          <ImageName>{image ? image.name : '아직 사진을 올리지 않았어요.'}</ImageName>
        </ImageContent>
      </FormInputBox>

      <SubmitButton type="submit" onClick={submitIfValid} disabled={!isFormValid()}>
        제출하기
      </SubmitButton>
    </Form>
  );
};

export default RequestDictionaryPlantForm;
