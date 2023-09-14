import { styled } from 'styled-components';

interface TagProps {
  selected: boolean;
}

export const Tag = styled.span<TagProps>`
  display: inline-block;

  margin-right: 10px;
  padding: 8px 12px;

  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme: { color } }) => color.sub};

  background-repeat: no-repeat;
  background-size: ${({ selected }) => (selected ? '100% 100%' : '0% 100%')};
  border: solid 1.6px;
  border-radius: 16px;

  transition: all 0.3s;
`;

export const DarkTag = styled(Tag)`
  color: ${({ selected, theme: { color } }) => (selected ? color.background : color.sub)};
  background-image: ${({ theme: { color } }) => `linear-gradient(${color.sub}, ${color.sub})`};
  border-color: ${({ theme: { color } }) => color.sub};
`;

export const GreenTag = styled(Tag)`
  color: ${({ selected, theme: { color } }) =>
    selected ? color.background : 'hsl(145, 77%, 38%)'};
  background-image: linear-gradient(hsl(145, 77%, 38%), hsl(145, 77%, 38%));
  border-color: hsl(145, 77%, 38%);
`;

export const BlueTag = styled(Tag)`
  color: ${({ selected, theme: { color } }) =>
    selected ? color.background : 'hsl(220, 77%, 38%)'};
  background-image: linear-gradient(hsl(220, 77%, 38%), hsl(220, 77%, 38%));
  border-color: hsl(220, 77%, 38%);
`;

export const RedTag = styled(Tag)`
  color: ${({ selected, theme: { color } }) => (selected ? color.background : 'hsl(7, 77%, 50%)')};
  background-image: linear-gradient(hsl(7, 77%, 50%), hsl(7, 77%, 50%));
  border-color: hsl(7, 77%, 50%);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;

export const Question = styled.p`
  margin-bottom: 15px;
  font-size: 1.4rem;
`;

export const QuestionLabel = styled.label`
  display: block;
  margin-bottom: 15px;
  font-size: 1.4rem;
`;

export const TextArea = styled.textarea`
  resize: vertical;
  display: block;
  width: 100%;
  border-radius: 4px;
`;

export const TextLengthNotice = styled.p`
  margin-top: 10px;
  font-size: 1.2rem;
  text-align: right;
`;

export const Button = styled.button`
  width: 100%;
  height: 36px;

  font-size: 1.4rem;
  font-weight: 900;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.color.background};
  letter-spacing: 1px;

  background: ${(props) => props.theme.color.primary};
  border-radius: 8px;

  &:disabled {
    color: ${(props) => props.theme.color.sub + '40'};
    background: ${(props) => props.theme.color.primary + '40'};
  }
`;
