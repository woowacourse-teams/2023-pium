import { styled } from 'styled-components';

export const HeaderBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 320px;
  margin: 0 auto;
  padding-bottom: 12px;

  border-bottom: 1px solid ${(props) => props.theme.color.grayLight};
`;

export const Name = styled.p`
  font: 900 2.4rem/4rem 'GmarketSans';
  color: ${(props) => props.theme.color.sub};
  text-align: left;
`;

export const FamilyName = styled.p`
  margin-bottom: 4px;
  font: 500 1.2rem/1.6rem 'GmarketSans';
  color: ${(props) => props.theme.color.sub};
  text-align: left;
`;

export const GardenButton = styled.button`
  display: flex;
  column-gap: 4px;
  align-items: center;

  height: 24px;
  margin-top: 16px;

  font-size: 1.4rem;
  font-weight: 600;
  color: ${(props) => props.theme.color.sub};
`;

export const ContentBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 35px;
  justify-content: space-between;

  width: 320px;
  margin: 0 auto;
`;

export const InformationTagBox = styled.div`
  font: ${(props) => props.theme.font.dictContent};

  p {
    font: ${(props) => props.theme.font.dictTitle};
  }
`;

export const PropsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  padding: 16px;

  color: ${(props) => props.theme.color.sub};

  background: ${(props) => props.theme.color.primary + '0c'};
  border-radius: 8px;
`;

export const PropBox = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  span {
    font: ${(props) => props.theme.font.dictContent};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Accent = styled.span`
  color: ${(props) => props.theme.color.primary};
`;

export const ManageInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  padding: 16px;

  font: ${(props) => props.theme.font.dictContent};

  background: #ececec;
  border-radius: 8px;

  & > p {
    font: ${(props) => props.theme.font.dictTitle};
  }
`;
