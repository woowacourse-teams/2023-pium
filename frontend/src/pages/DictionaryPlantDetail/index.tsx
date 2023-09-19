import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Header } from 'pages/PetPlantRegister/Form/Form.style';
import Image from 'components/@common/Image';
import SvgFill from 'components/@common/SvgIcons/SvgFill';
import DictionaryPlantContent from 'components/dictionaryPlant/DictionaryPlantContent';
import { BackButton, Footer, Main, PrimaryButton } from './DictionaryPlantDetail.style';
import useDictionaryPlantDetail from 'hooks/queries/dictionaryPlant/useDictionaryPlantDetail';
import { URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

const DictionaryPlantDetail = () => {
  const { id } = useParams();
  if (!id) throw new Error('URL에 id가 없습니다.');

  const dictionaryPlantId = Number(id);
  const { data: dictionaryPlantDetail } = useDictionaryPlantDetail(dictionaryPlantId);
  const { image, name } = dictionaryPlantDetail;

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goPetPlantRegisterForm = () => {
    navigate(generatePath(URL_PATH.petRegisterForm, { id: String(dictionaryPlantId) }));
  };

  return (
    <>
      <Header>
        <BackButton onClick={goBack}>
          <SvgFill icon="line-arrow-left" aria-label="뒤로 가기" color={theme.color.sub} />
        </BackButton>
      </Header>
      <Main>
        <Image type="wide" src={image} alt={name} size="300px" />
        <DictionaryPlantContent {...dictionaryPlantDetail} />
      </Main>
      <Footer>
        <PrimaryButton onClick={goPetPlantRegisterForm}>반려 식물로 등록하기</PrimaryButton>
      </Footer>
    </>
  );
};

export default DictionaryPlantDetail;
