import styled, { css } from 'styled-components';

interface InputWrapperProps {
  $width?: string;
}

const singleLineText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  justify-content: center;

  margin: 0 auto 48px auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  width: calc(${({ theme }) => theme.width.mobile} - 20px);
  margin: 0 auto;
`;

export const Title = styled.h1`
  display: flex;
  column-gap: 2px;
  align-items: center;

  font: ${({ theme }) => theme.font.title};
  font-size: 2.4rem;

  ${singleLineText}
`;

export const SubTitle = styled.h2`
  display: flex;
  column-gap: 2px;
  align-items: center;

  font: ${({ theme }) => theme.font.dictContent};
  font-size: 1.8rem;

  ${singleLineText}
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayLight};
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.span`
  font: ${({ theme }) => theme.font.dictContent};
  font-size: 1.6rem;
`;

export const Bold = styled.span`
  font: ${({ theme }) => theme.font.dictContent};
  font-size: 1.6rem;
  font-weight: bold;
`;

export const ExpandedTextBox = styled.p`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  font: ${({ theme }) => theme.font.dictContent};
  font-size: 1.6rem;
`;

export const Environment = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  align-items: center;

  width: 100%;
  padding: 30px;

  background-color: ${({ theme }) => theme.color.primary}13;
  border-radius: 5px;
`;

export const EnvironmentItem = styled.p`
  display: flex;
  column-gap: 8px;
  align-items: center;

  width: 100%;

  font-size: 1.6rem;
`;

export const EnvironmentTitle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  color: ${({ theme }) => theme.color.primary};

  background: ${({ theme }) => theme.color.background};
  border-radius: 50%;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  width: ${({ $width }) => $width};
  border-bottom: 2px solid ${({ theme }) => theme.color.primary};
`;

export const HiddenLabel = styled.label`
  position: absolute;

  overflow: hidden;

  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;

  white-space: nowrap;

  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  border: 0;
`;

export const Input = styled.input`
  height: 30px;
  font-size: 2.5rem;
  text-align: center;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const NicknameInput = styled(Input)`
  width: 100%;
`;

export const WaterCycleInput = styled(Input)`
  width: 100px;
  margin-bottom: 5px;
`;

export const Select = styled.select`
  width: 100%;
  height: 30px;

  font-size: 1.6rem;
  text-align: center;

  background: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.color.primary};
`;

export const ButtonArea = styled.div`
  display: flex;
  column-gap: 10px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 48px;

  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;

  border-radius: 8px;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)`
  color: ${({ theme }) => theme.color.background};
  background: ${(props) => props.theme.color.primary};

  &:disabled {
    color: ${(props) => props.theme.color.sub + '40'};
    background: ${(props) => props.theme.color.primary + '40'};
  }
`;

export const SecondaryButton = styled(Button)`
  font-weight: normal;
  color: ${({ theme }) => theme.color.sub};
  background: ${(props) => props.theme.color.background};
  border: 1px solid ${({ theme }) => theme.color.primary};
`;
