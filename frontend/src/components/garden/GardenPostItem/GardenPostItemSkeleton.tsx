import {
  ContentArea,
  EnvironmentItem,
  GreenBox,
  Header,
  HeaderContent,
  SkeletonItem,
  TagArea,
  TagSkeleton,
  Wrapper,
} from './GardenPostItem.styles';

const GardenPostItemSkeleton = () => {
  return (
    <Wrapper>
      <Header>
        <SkeletonItem width="40px" height="40px" />
        <HeaderContent>
          <SkeletonItem width="64px" height="1.8rem" />
          <SkeletonItem width="128px" height="1.4rem" />
        </HeaderContent>
      </Header>
      <ContentArea>
        <SkeletonItem width="100%" height="1.6rem" />
      </ContentArea>
      <TagArea>
        <TagSkeleton />
        <TagSkeleton />
        <TagSkeleton />
      </TagArea>
      <GreenBox>
        <EnvironmentItem>
          <SkeletonItem width="20%" height="1.2rem" />
        </EnvironmentItem>
        <EnvironmentItem>
          <SkeletonItem width="50%" height="1.2rem" />
        </EnvironmentItem>
        <EnvironmentItem>
          <SkeletonItem width="60%" height="1.2rem" />
        </EnvironmentItem>
        <EnvironmentItem>
          <SkeletonItem width="45%" height="1.2rem" />
        </EnvironmentItem>
      </GreenBox>
    </Wrapper>
  );
};

export default GardenPostItemSkeleton;
