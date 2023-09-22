import { styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  height: 40px;

  & + & {
    margin-top: 40px;
  }
`;

export const IconArea = styled.div`
  display: flex;
  align-items: center;

  width: 16px;
  height: 100%;
  margin-right: 8px;
`;

export const ItemHead = styled.p`
  font-size: 1.4rem;
  line-height: 1.8rem;
  color: ${(props) => props.theme.color.sub};
`;

export const ItemContent = styled.p`
  display: flex;
  align-items: center;

  margin-top: 8px;

  font-size: 1.2rem;
  line-height: 1.6rem;
`;
