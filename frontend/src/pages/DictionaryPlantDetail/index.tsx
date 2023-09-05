import { useParams } from 'react-router-dom';
import Image from 'components/@common/Image';
import Navbar from 'components/@common/Navbar';
import DictionaryPlantContent from 'components/dictionaryPlant/DictionaryPlantContent';
import { Main } from './DictionaryPlantDetail.style';
import useDictionaryPlantDetail from 'hooks/queries/dictionaryPlant/useDictionaryPlantDetail';

const DictionaryPlantDetail = () => {
  const { id } = useParams();
  if (!id) throw new Error('URL에 id가 없습니다.');

  const dictionaryPlantId = Number(id);
  const { data: dictionaryPlantDetail } = useDictionaryPlantDetail(dictionaryPlantId);
  const { image, name } = dictionaryPlantDetail;

  return (
    <>
      <Main>
        <Image type="wide" src={image} alt={name} size="300px" />
        <DictionaryPlantContent {...dictionaryPlantDetail} />
      </Main>
      <Navbar />
    </>
  );
};

export default DictionaryPlantDetail;
