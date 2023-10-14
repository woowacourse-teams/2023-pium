import { useLocation } from 'react-router-dom';
import ContentHeader from 'components/@common/ContentHeader';
import PageLogger from 'components/@common/PageLogger';
import { Description, Main } from './NewDictionaryPlantRequest.style';
import { NUMBER } from 'constants/index';
import Form from './Form';

const NewDictionaryPlantRequest = () => {
  const { state } = useLocation();

  const initialName = typeof state === 'string' ? state.slice(0, NUMBER.maxNicknameLength) : '';

  return (
    <PageLogger>
      <ContentHeader title="새로운 식물 추가 요청하기" />
      <Main>
        <Description>요청하신 식물은 저희가 검토 후 추가할게요!</Description>
        <Form initialName={initialName} />
      </Main>
    </PageLogger>
  );
};

export default NewDictionaryPlantRequest;
