import { generatePath, useNavigate, useParams } from 'react-router-dom';
import BackHeader from 'components/@common/BackHeader';
import Image from 'components/@common/Image';
import PageLogger from 'components/@common/PageLogger';
import DictionaryPlantContent from 'components/dictionaryPlant/DictionaryPlantContent';
import { BottomSheet, Main, PrimaryButton } from './DictionaryPlantDetail.style';
import useAddToast from 'hooks/@common/useAddToast';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import useDictionaryPlantDetail from 'hooks/queries/dictionaryPlant/useDictionaryPlantDetail';
import { URL_PATH } from 'constants/index';

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
    <PageLogger>
      <BackHeader />
      <Main>
        <Image type="wide" src={image} alt={name} size="300px" />
        <DictionaryPlantContent {...dictionaryPlantDetail} />
      </Main>
      <BottomSheet>
        <PrimaryButton onClick={isLoggedIn ? goPetPlantRegisterForm : warning}>
          반려 식물로 등록하기
        </PrimaryButton>
      </BottomSheet>
    </PageLogger>
  );
};

export default DictionaryPlantDetail;
