import { styled } from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 320px;
  margin: 48px auto;
`;

export const HeaderBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const FamilyName = styled.p`
  margin-bottom: 4px;
  font: ${(props) => props.theme.font.input};
  color: ${(props) => props.theme.color.sub};
  text-align: center;
`;

export const Name = styled.p`
  font: 600 3.6rem/4rem 'NanumSquareRound';
  color: ${(props) => props.theme.color.sub};
  text-align: center;
`;

export const PlantImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

export const ContentBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 35px;

  div {
    font: ${(props) => props.theme.font.dictContent};

    p {
      font: ${(props) => props.theme.font.dictTitle};
    }
  }
`;

export const PropsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

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

  background: #ececec;
  border-radius: 8px;

  p {
    font: ${(props) => props.theme.font.dictTitle};
  }

  span {
    font: ${(props) => props.theme.font.dictContent};
  }
`;
