import { keyframes, styled } from 'styled-components';
import Image from 'components/@common/Image';

const skeletonBackground = keyframes`
  0%    { background-color: rgba(176, 176, 176, 0.1) }
  50%   { background-color: rgba(176, 176, 176, 0.3) }
  100%  { background-color: rgba(176, 176, 176, 0.1) }
`;

interface SkeletonItemProps {
  width: string;
  height: string;
}

export const SkeletonItem = styled.div<SkeletonItemProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 4px;
  animation: ${skeletonBackground} 1s infinite;
`;

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

export const PetPlantImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 8px;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;

  width: 40%;
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
  color: ${(props) => props.theme.color.grayDark};
`;

export const PostingDate = styled.p`
  width: max-content;
  margin-top: 4px;
  font-size: 1rem;
  color: ${(props) => props.theme.color.grayDark};
`;

export const GreenBox = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  align-items: center;

  width: 100%;
  margin-top: 16px;
  padding: 12px;

  background-color: ${({ theme }) => theme.color.primary}13;
  border-radius: 8px;
`;

export const EnvironmentItem = styled.p`
  display: flex;
  column-gap: 8px;
  align-items: center;

  width: 100%;
  height: 24px;

  font-size: 1.2rem;
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

export const ContentArea = styled.div`
  width: 100%;
  margin-top: 32px;
  padding: 4px;

  font-size: 1.6rem;
  color: ${(props) => props.theme.color.sub};
`;

export const TagArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;

  width: 100%;
  margin-top: 24px;
`;

export const Tag = styled.div`
  width: max-content;
  margin-right: 8px;
  padding: 8px 12px;

  font-size: 1.4rem;
  font-weight: 600;
  color: ${(props) => props.theme.color.sub};

  border: solid 1.5px;
  border-radius: 16px;
`;

export const TagSkeleton = styled(Tag)`
  width: 80px;
  height: 33px;
  border: solid 1.5px transparent;
  animation: ${skeletonBackground} 1s infinite;
`;

export const DictionaryPlantTag = styled(Tag)`
  border-color: ${({ theme }) => theme.color.primary};
`;

export const WaterCycleTag = styled(Tag)`
  border-color: ${({ theme }) => theme.color.water};
`;

export const ManageLevelTag = styled(Tag)`
  border-color: ${({ theme }) => theme.color.grayDark};
`;
