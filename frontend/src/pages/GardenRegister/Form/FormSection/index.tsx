import { ManageLevel } from 'types/dictionaryPlant';
import { PetPlantDetails } from 'types/petPlant';
import React, { useState, useId } from 'react';
import InlineRadio from 'components/@common/InlineRadio';
import {
  BlueTag,
  Button,
  DarkTag,
  StyledForm,
  GreenTag,
  Question,
  QuestionLabel,
  RedTag,
  TextArea,
  TextLengthNotice,
} from './FormSection.style';
import useGardenRegister from 'hooks/queries/garden/useGardenRegister';
import { isValidManageLevel } from 'utils/validate';
import { NUMBER } from 'constants/index';

interface FormSectionProps {
  petPlantId: PetPlantDetails['id'];
}

const FormSection = (props: FormSectionProps) => {
  const { petPlantId } = props;

  const [manageLevel, setManageLevel] = useState<ManageLevel>('정보없음');
  const [content, setContent] = useState('');
  const contentId = useId();
  const { mutate, isPending } = useGardenRegister();

  const setGardenContent: React.ChangeEventHandler<HTMLTextAreaElement> = ({
    target: { value },
  }) => {
    setContent(value.slice(0, NUMBER.maxGardenContentLength));
  };

  const isFormValid = () =>
    isValidManageLevel(manageLevel) &&
    content.trim().length > 0 &&
    content.trim().length <= NUMBER.maxGardenContentLength;

  const submit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (!isFormValid()) return;
    mutate({ petPlantId, manageLevel, content });
  };

  return (
    <StyledForm>
      <div>
        <Question>이 식물은 어떤 분에게 추천하시나요?</Question>
        <InlineRadio
          name="manage-level"
          value={manageLevel}
          setValue={setManageLevel as React.Dispatch<React.SetStateAction<string>>}
        >
          <InlineRadio.Option value="정보없음">
            <DarkTag selected={manageLevel === '정보없음'}>선택안함</DarkTag>
          </InlineRadio.Option>
          <InlineRadio.Option value="초보자">
            <GreenTag selected={manageLevel === '초보자'}>초보자</GreenTag>
          </InlineRadio.Option>
          <InlineRadio.Option value="경험자">
            <BlueTag selected={manageLevel === '경험자'}>경험자</BlueTag>
          </InlineRadio.Option>
          <InlineRadio.Option value="전문가">
            <RedTag selected={manageLevel === '전문가'}>전문가</RedTag>
          </InlineRadio.Option>
        </InlineRadio>
      </div>
      <div>
        <QuestionLabel htmlFor={contentId}>내용을 입력해 주세요.</QuestionLabel>
        <TextArea
          id={contentId}
          rows={5}
          value={content}
          onChange={setGardenContent}
          maxLength={NUMBER.maxGardenContentLength}
        />
        <TextLengthNotice>
          {content.length} / {NUMBER.maxGardenContentLength}자
        </TextLengthNotice>
      </div>
      <Button type="submit" onClick={submit} disabled={isPending || !isFormValid()}>
        기록하기
      </Button>
    </StyledForm>
  );
};

export default FormSection;
