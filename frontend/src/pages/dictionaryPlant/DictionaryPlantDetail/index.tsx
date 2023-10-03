import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Header } from 'pages/petPlant/PetPlantRegister/Form/Form.style';
import Image from 'components/@common/Image';
import SvgFill from 'components/@common/SvgIcons/SvgFill';
import DictionaryPlantContent from 'components/dictionaryPlant/DictionaryPlantContent';
import { BackButton, BottomSheet, Main, PrimaryButton } from './DictionaryPlantDetail.style';
import useAddToast from 'hooks/@common/useAddToast';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import useDictionaryPlantDetail from 'hooks/queries/dictionaryPlant/useDictionaryPlantDetail';
import { URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

const DictionaryPlantDetail = () => {
  const { id } = useParams();
  if (!id) throw new Error('URL에 id가 없습니다.');

  const { isSuccess: isLoggedIn } = useCheckSessionId(false);
  const addToast = useAddToast();

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

  const goLogin = () => {
    navigate(URL_PATH.login);
  };

  const warning = () => {
    addToast({
      type: 'info',
      message: '로그인 후 등록할 수 있어요',
      time: 4000,
      buttonContent: '로그인',
      onClickButton: goLogin,
    });
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
      <BottomSheet>
        <PrimaryButton onClick={isLoggedIn ? goPetPlantRegisterForm : warning}>
          반려 식물로 등록하기
        </PrimaryButton>
      </BottomSheet>
    </>
  );
};

export default DictionaryPlantDetail;
