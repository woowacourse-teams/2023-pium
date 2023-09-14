import React, { useState, useId } from 'react';
import { useParams } from 'react-router-dom';
import InlineRadio from 'components/@common/InlineRadio';
import {
  BlueTag,
  Button,
  DarkTag,
  Form,
  GreenTag,
  Question,
  QuestionLabel,
  RedTag,
  TextArea,
  TextLengthNotice,
} from './Form.style';
import { NUMBER } from 'constants/index';

const GardenRegisterForm = () => {
  const { id } = useParams();
  if (!id) throw new Error('URL에 id가 없습니다.');

  const [manageLevel, setManageLevel] = useState('정보없음');
  const [content, setContent] = useState('');
  const contentId = useId();

  const setGardenContent: React.ChangeEventHandler<HTMLTextAreaElement> = ({
    target: { value },
  }) => {
    setContent(value.slice(0, NUMBER.maxGardenContentLength));
  };

  const submit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    alert('제출 성공?');
  };

  return (
    <Form>
      <div>
        <Question>이 식물은 어떤 분에게 추천하시나요?</Question>
        <InlineRadio name="manage-level" value={manageLevel} setValue={setManageLevel}>
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
        <QuestionLabel htmlFor={contentId}>(선택) 내용을 입력해 주세요.</QuestionLabel>
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
      <Button type="submit" onClick={submit}>
        등록하기
      </Button>
    </Form>
  );
};

export default GardenRegisterForm;
