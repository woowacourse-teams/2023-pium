import { useRecoilValue } from 'recoil';
import {
  ButtonArea,
  Message,
  ConfirmBox,
  PrimaryButton,
  SecondaryButton,
  Title,
} from './Confirm.style';
import confirm from 'store/atoms/confirm';
import useConfirmModal from 'hooks/@common/useConfirmModal';

const Confirm = () => {
  const { isOpen, title, message, setAnswer } = useRecoilValue(confirm);
  const modalRef = useConfirmModal();

  return (
    isOpen && (
      <ConfirmBox ref={modalRef} key={Math.random()}>
        {title && <Title>{title}</Title>}
        <Message>{message}</Message>
        <ButtonArea>
          <PrimaryButton type="button" onClick={() => setAnswer?.(true)}>
            네
          </PrimaryButton>
          <SecondaryButton type="button" onClick={() => setAnswer?.(false)}>
            아니오
          </SecondaryButton>
        </ButtonArea>
      </ConfirmBox>
    )
  );
};

export default Confirm;
