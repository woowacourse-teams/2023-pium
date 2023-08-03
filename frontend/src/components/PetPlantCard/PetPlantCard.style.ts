import { styled } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;

  width: 160px;
  height: 224px;

  background: white;
  border: 1px solid ${({ theme }) => theme.color.gray};
  border-radius: 16px;
  box-shadow: 0 0 4px 1px ${(props) => props.theme.color.grayLight};
`;

export const CrownArea = styled.div`
  position: absolute;
  top: -32px;
  right: -8px;
  transform: rotate(20deg);

  font-size: 7rem;
`;

export const ImageArea = styled.div`
  overflow: hidden;
  width: 100%;
  height: 160px;
  border-radius: 16px 16px 0 0;
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 64px;
  padding: 12px 16px;

  color: ${(props) => props.theme.color.sub};
`;

export const Nickname = styled.p`
  overflow: hidden;

  width: 100%;

  font-size: 1.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ContentRow = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

export const DictionaryPlantName = styled.p`
  overflow: hidden;

  width: 70%;

  font-size: 1.4rem;
  color: ${(props) => props.theme.color.grayDark};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DaySince = styled.p`
  font-size: 1.4rem;
`;

export const DaySinceNumber = styled.span`
  margin-left: 2px;
  font-size: 1.8rem;
  font-weight: 900;
  color: ${(props) => props.theme.color.primary};
`;
