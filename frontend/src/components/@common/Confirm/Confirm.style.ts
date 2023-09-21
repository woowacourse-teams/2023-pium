import styled, { css, keyframes } from 'styled-components';
import { ModalBox } from '../Modal/Modal.style';

const alert = keyframes`
  0% { transform: rotate(1deg); }
  25% { transform: rotate(0deg); }
  50% { transform: rotate(-1deg); }
  100% { transform: rotate(0deg); }
`;

export const ConfirmBox = styled(ModalBox)`
  top: calc(50vh - 50%);

  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
  justify-content: center;

  width: 90%;
  max-width: ${({ theme: { width } }) => width.pad};
  margin: auto;
  padding: 30px 0;

  animation: ${alert} 0.15s linear 2;

  &::backdrop {
    cursor: default;
  }
`;

const textBox = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: calc(100%- 50px);
  min-width: calc(${({ theme: { width } }) => width.mobile} - 50px);
  max-width: calc(${({ theme: { width } }) => width.pad} - 50px);
`;

export const Title = styled.h2`
  ${textBox}
  font: ${({ theme: { font } }) => font.subTitle};
`;

export const Message = styled.p`
  ${textBox}
  font: ${({ theme: { font } }) => font.dictContent};
`;

export const ButtonArea = styled.div`
  display: flex;
  column-gap: 30px;

  width: calc(100% - 50px);
  min-width: calc(${({ theme: { width } }) => width.mobile} - 50px);
  max-width: calc(${({ theme: { width } }) => width.pad} - 50px);
  padding: 0 30px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 32px;

  font-size: 1.5rem;
  font-weight: normal;
  line-height: 2rem;
  letter-spacing: 1px;

  border-radius: 8px;
`;

export const PrimaryButton = styled(Button)`
  color: ${({ theme }) => theme.color.background};
  background: ${(props) => props.theme.color.primary};
`;

export const SecondaryButton = styled(Button)`
  color: ${({ theme }) => theme.color.sub};
  background: ${(props) => props.theme.color.background};
  border: 1px solid ${({ theme }) => theme.color.primary};
`;
