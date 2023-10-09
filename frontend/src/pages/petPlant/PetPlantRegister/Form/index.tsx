import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'components/@common/Modal';
import PageLogger from 'components/@common/PageLogger';
import SvgFill from 'components/@common/SvgIcons/SvgFill';
import SvgStroke from 'components/@common/SvgIcons/SvgStroke';
import DictionaryPlantContent from 'components/dictionaryPlant/DictionaryPlantContent';
import PetPlantRegisterForm from 'components/petPlant/PetPlantRegisterForm';
import { BackButton, DictionaryPlantButton, DictionaryPlantName, Header, Main } from './Form.style';
import useModal from 'hooks/@common/useModal';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import useDictionaryPlantDetail from 'hooks/queries/dictionaryPlant/useDictionaryPlantDetail';
import theme from 'style/theme.style';

const PetPlantRegisterFormPage = () => {
  const { id } = useParams();
  if (!id) throw new Error('URL에 id가 없습니다.');
  const dictionaryPlantId = Number(id);

  useCheckSessionId();
  const navigate = useNavigate();

  const { data: dictionaryPlantDetail } = useDictionaryPlantDetail(dictionaryPlantId);
  const { name, image } = dictionaryPlantDetail;
  const { isOpen, open, close, modalRef } = useModal();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLogger>
      <Header>
        <BackButton onClick={goBack}>
          <SvgFill icon="line-arrow-left" aria-label="뒤로 가기" color={theme.color.sub} />
        </BackButton>
      </Header>
      <Main>
        <DictionaryPlantName>{name}</DictionaryPlantName>
        <DictionaryPlantButton onClick={open}>
          <span>사전 정보</span> <SvgStroke icon="dictionary" color={theme.color.grayDark} />
        </DictionaryPlantButton>
        <PetPlantRegisterForm
          dictionaryPlantId={dictionaryPlantId}
          defaultNickname={name}
          dictionaryImageUrl={image}
        />
      </Main>
      <Modal ref={modalRef} isOpen={isOpen} closeModal={close}>
        <DictionaryPlantContent {...dictionaryPlantDetail} />
      </Modal>
    </PageLogger>
  );
};

export default PetPlantRegisterFormPage;
