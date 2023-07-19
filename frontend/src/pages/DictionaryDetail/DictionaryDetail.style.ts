import { styled } from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 320px;
  margin: 0 auto 24px auto;
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
`;

export const LevelBox = styled.div`
  font: ${(props) => props.theme.font.dictContent};

  p {
    font: ${(props) => props.theme.font.dictTitle};
  }
`;
export const CycleBox = styled.div`
  font: ${(props) => props.theme.font.dictContent};

  p {
    font: ${(props) => props.theme.font.dictTitle};
  }
`;
export const LocationBox = styled.div`
  font: ${(props) => props.theme.font.dictContent};

  p {
    font: ${(props) => props.theme.font.dictTitle};
  }
`;
export const PropsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 35px;
  font: ${(props) => props.theme.font.dictContent};

  p {
    font: ${(props) => props.theme.font.dictTitle};
  }
`;
export const ManageInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;

  p {
    font: ${(props) => props.theme.font.dictTitle};
  }

  span {
    font: ${(props) => props.theme.font.dictContent};
  }
`;
