import { styled } from 'styled-components';

export const HiddenInput = styled.input`
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

export const UploadButton = styled.button`
  width: 100%;
  height: 300px;
  border: 1px solid ${({ theme: { color } }) => color.sub};
  border-radius: 5px;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  object-fit: cover;
  border-radius: 5px;
`;

export const ImageContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 80px;
  align-items: center;

  margin-bottom: 100px;
`;

export const ImageName = styled.p`
  font: ${({ theme: { font } }) => font.input};
`;

export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 90%;
  height: 48px;

  font-size: 2rem;
  font-weight: 700;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.color.background};
  letter-spacing: 1px;

  background: ${(props) => props.theme.color.primary};
  border-radius: 8px;

  &:disabled {
    cursor: not-allowed;
    color: ${(props) => props.theme.color.sub + '40'};
    background: ${(props) => props.theme.color.primary + '40'};
  }
`;
