import { useParams } from 'react-router-dom';
import Dictionary from 'components/@common/Icons/Dictionary';
import Image from 'components/@common/Image';
import Modal from 'components/@common/Modal';
import DictionaryPlantContent from 'components/dictionaryPlant/DictionaryPlantContent';
import PetPlantRegisterForm from 'components/petPlant/PetPlantRegisterForm';
import {
  BackLink,
  DictionaryPlantImageArea,
  DictionaryPlantName,
  Header,
  Main,
} from './Form.style';
import useDictDetail from 'hooks/queries/dictionary/useDictDetail';
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
        <BackLink to={URL_PATH.petRegisterSearch}>{'<'}</BackLink>
      </Header>
      <Main>
        <DictionaryPlantName onClick={open}>
          <span>{name}</span> <Dictionary />
        </DictionaryPlantName>
        <DictionaryPlantImageArea>
          <Image size="160px" src={image} />
        </DictionaryPlantImageArea>
        <PetPlantRegisterForm dictionaryPlantId={dictionaryPlantId} />
      </Main>
      <Modal ref={modalRef} isOpen={isOpen} closeModal={close}>
        <DictionaryPlantContent {...dictionaryPlantDetail} />
      </Modal>
    </>
  );
};

export default PetPlantRegisterFormPage;
