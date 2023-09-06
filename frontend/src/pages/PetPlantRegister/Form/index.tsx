import { useParams } from 'react-router-dom';
import Dictionary from 'components/@common/Icons/Dictionary';
import LineArrowLeft from 'components/@common/Icons/LineArrowLeft';
import Image from 'components/@common/Image';
import ImageButton from 'components/@common/ImageButton';
import useFileUpload from 'components/@common/ImageButton/hooks/useFileUpload';
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
  AddImageButton,
} from './Form.style';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import useDictionaryPlantDetail from 'hooks/queries/dictionaryPlant/useDictionaryPlantDetail';
import useModal from 'hooks/useModal';
import { URL_PATH } from 'constants/index';

const PetPlantRegisterFormPage = () => {
  useCheckSessionId();

  const { id } = useParams();
  if (!id) throw new Error('URL에 id가 없습니다.');

  const dictionaryPlantId = Number(id);
  const { data: dictionaryPlantDetail, isSuccess } = useDictionaryPlantDetail(dictionaryPlantId);
  const { uploadedImageUrl, fileUploadHandler, imgRef } = useFileUpload({}); // 현재 image가 undefiend 여서 사용이 불가능..
  const { isOpen, open, close, modalRef } = useModal();

  if (!isSuccess) return null;
  const { name } = dictionaryPlantDetail;

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
          <Image size="160px" src={uploadedImageUrl} alt={name} />
          <ImageButton ref={imgRef} customCss={AddImageButton} changeCallback={fileUploadHandler} />
        </DictionaryPlantImageArea>
        <PetPlantRegisterForm
          dictionaryPlantId={dictionaryPlantId}
          defaultNickname={name}
          customFileUrl=""
        />
      </Main>
      <Modal ref={modalRef} isOpen={isOpen} closeModal={close}>
        <DictionaryPlantContent {...dictionaryPlantDetail} />
      </Modal>
    </>
  );
};

export default PetPlantRegisterFormPage;
