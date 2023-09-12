import { useLocation } from 'react-router-dom';
import ContentHeader from 'components/@common/ContentHeader';
import Navbar from 'components/@common/Navbar';
import { Description, Main } from './NewDictionaryPlantRequest.style';
import Form from './Form';

const NewDictionaryPlantRequest = () => {
  const { state } = useLocation();

  const initialName = typeof state === 'string' ? state.slice(0, 30) : '';

  return (
    <>
      <ContentHeader title="새로운 식물 추가 요청하기" />
      <Main>
        <Description>요청하신 식물은 저희가 검토 후 추가할게요!</Description>
        <Form initialName={initialName} />
      </Main>
      <Navbar />
    </>
  );
};

export default NewDictionaryPlantRequest;
