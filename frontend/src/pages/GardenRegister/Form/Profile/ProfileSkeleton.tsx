import {
  Text,
  NameArea,
  Section,
  Environment,
  Title,
  StyledLink,
  SkeletonItem,
} from './Profile.style';

const ProfileSkeleton = () => {
  return (
    <>
      <Section>
        <Title>
          <SkeletonItem width="100px" height="100px" />
          <NameArea>
            <SkeletonItem width="100%" height="1.8rem" />
            <SkeletonItem width="100%" height="1.4rem" />
          </NameArea>
        </Title>
        <Text>
          <SkeletonItem width="50%" height="2rem" />
        </Text>
        <Environment>
          <SkeletonItem width="100%" height="2.4rem" />
          <SkeletonItem width="100%" height="2.4rem" />
          <SkeletonItem width="100%" height="2.4rem" />
          <SkeletonItem width="100%" height="2.4rem" />
        </Environment>
      </Section>
      <StyledLink to="">로딩중..</StyledLink>
    </>
  );
};

export default ProfileSkeleton;
