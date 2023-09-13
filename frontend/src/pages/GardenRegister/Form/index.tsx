import { useState, useId } from 'react';
import { useParams } from 'react-router-dom';
import InlineRadio from 'components/@common/InlineRadio';

const GardenRegisterForm = () => {
  const { id } = useParams();
  if (!id) throw new Error('URL에 id가 없습니다.');

  const [manageLevel, setManageLevel] = useState('');
  const contentId = useId();

  return (
    <>
      <form>
        <p>이 식물은 어떤 분에게 추천하시나요?</p>
        <InlineRadio name="manage-level" value={manageLevel} setValue={setManageLevel}>
          <InlineRadio.Option value="정보없음">
            <span>선택안함</span>
          </InlineRadio.Option>
          <InlineRadio.Option value="초보자">
            <span>초보자</span>
          </InlineRadio.Option>
          <InlineRadio.Option value="경험자">
            <span>경험자</span>
          </InlineRadio.Option>
          <InlineRadio.Option value="전문가">
            <span>전문가</span>
          </InlineRadio.Option>
        </InlineRadio>
        <label htmlFor={contentId}>(선택) 내용을 입력해 주세요.</label>
        <textarea id={contentId} />
        <button type="submit" onClick={(e) => e.preventDefault()}>
          등록하기
        </button>
      </form>
    </>
  );
};

export default GardenRegisterForm;
