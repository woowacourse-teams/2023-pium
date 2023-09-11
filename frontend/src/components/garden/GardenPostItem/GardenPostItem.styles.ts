import { styled } from 'styled-components';

export const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 0 16px;

  list-style: none;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;

export const PetPlantImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 176px;
  height: 100%;
  margin-right: auto;
  margin-left: 16px;
`;

export const PetPlantNickname = styled.p`
  overflow: hidden;

  font-size: 1.8rem;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DaySince = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => props.theme.color.sub};
`;

export const PostingDate = styled.p`
  width: max-content;
  margin-top: 4px;
  font-size: 1rem;
  color: ${(props) => props.theme.color.sub};
`;

export const Environment = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  align-items: center;

  width: 100%;
  margin-top: 16px;
  padding: 16px;

  background-color: ${({ theme }) => theme.color.primary}13;
  border-radius: 8px;
`;

export const EnvironmentItem = styled.p`
  display: flex;
  column-gap: 8px;
  align-items: center;

  width: 100%;

  font-size: 1.4rem;
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

export const TagArea = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;

  & > div + div {
    margin-left: 8px;
  }
`;

export const Tag = styled.div`
  width: max-content;
  padding: 8px 12px;

  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.sub};

  border: solid 1.6px;
  border-radius: 16px;
`;

export const WaterCycleTag = styled(Tag)`
  border-color: ${({ theme }) => theme.color.water};
`;

export const ManageLevelTag = styled(Tag)`
  border-color: ${({ theme }) => theme.color.primary};
`;

export const ContentArea = styled.div`
  width: 100%;
  margin-top: 24px;
  font-size: 1.6rem;
  color: ${(props) => props.theme.color.sub};
`;
