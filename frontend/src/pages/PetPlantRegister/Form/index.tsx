import { useParams } from 'react-router-dom';
import Image from 'components/@common/Image';
import Modal from 'components/@common/Modal';
import SvgFill from 'components/@common/SvgIcons/SvgFill';
import SvgStroke from 'components/@common/SvgIcons/SvgStroke';
import DictionaryPlantContent from 'components/dictionaryPlant/DictionaryPlantContent';
import PetPlantRegisterForm from 'components/petPlant/PetPlantRegisterForm';
import {
  BackLink,
  DictionaryPlantButton,
  DictionaryPlantImageArea,
  DictionaryPlantName,
  Header,
  Main,
} from './Form.style';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import useDictionaryPlantDetail from 'hooks/queries/dictionaryPlant/useDictionaryPlantDetail';
import useModal from 'hooks/useModal';
import { URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

const PetPlantRegisterFormPage = () => {
  useCheckSessionId();

  const { id } = useParams();
  if (!id) throw new Error('URL에 id가 없습니다.');

  const dictionaryPlantId = Number(id);
  const { data: dictionaryPlantDetail } = useDictionaryPlantDetail(dictionaryPlantId);
  const { name, image } = dictionaryPlantDetail;
  const { isOpen, open, close, modalRef } = useModal();

  return (
    <>
      <Header>
        <BackLink to={URL_PATH.petRegisterSearch}>
          <SvgFill icon="line-arrow-left" aria-label="뒤로 가기" color={theme.color.sub} />
        </BackLink>
      </Header>
      <Main>
        <DictionaryPlantName>{name}</DictionaryPlantName>
        <DictionaryPlantButton onClick={open}>
          <span>사전 정보</span> <SvgStroke icon="dictionary" color={theme.color.grayDark} />
        </DictionaryPlantButton>
        <DictionaryPlantImageArea>
          <Image size="160px" src={image} alt={name} />
        </DictionaryPlantImageArea>
        <PetPlantRegisterForm dictionaryPlantId={dictionaryPlantId} defaultNickname={name} />
      </Main>
      <Modal ref={modalRef} isOpen={isOpen} closeModal={close}>
        <DictionaryPlantContent {...dictionaryPlantDetail} />
      </Modal>
    </>
  );
};

export default PetPlantRegisterFormPage;
