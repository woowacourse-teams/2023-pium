import { useParams } from 'react-router-dom';
import Dictionary from 'components/@common/Icons/Dictionary';
import LineArrowLeft from 'components/@common/Icons/LineArrowLeft';
import Image from 'components/@common/Image';
import Modal from 'components/@common/Modal';
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
import useDictDetail from 'hooks/queries/dictionaryPlant/useDictionaryPlantDetail';
import useModal from 'hooks/useModal';
import { URL_PATH } from 'constants/index';

const PetPlantRegisterFormPage = () => {
  const { id } = useParams();
  if (!id) throw new Error('URL에 id가 없습니다.');

  const dictionaryPlantId = Number(id);
  const { data: dictionaryPlantDetail, isSuccess } = useDictDetail(dictionaryPlantId);

  const { isOpen, open, close, modalRef } = useModal();

  if (!isSuccess) return null;
  const { name, image } = dictionaryPlantDetail;
  return (
    <>
      <Header>
        <BackLink to={URL_PATH.petRegisterSearch}>
          <LineArrowLeft aria-label="뒤로 가기" />
        </BackLink>
      </Header>
      <Main>
        <DictionaryPlantName>{name}</DictionaryPlantName>
        <DictionaryPlantButton onClick={open}>
          <span>사전 정보</span> <Dictionary />
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
