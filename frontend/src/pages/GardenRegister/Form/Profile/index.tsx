import { PetPlantDetails } from 'types/petPlant';
import Image from 'components/@common/Image';
import { DictionaryPlantName, Nickname, Section } from './Profile.style';

interface ProfileProps {
  nickname: PetPlantDetails['nickname'];
  dictionaryPlantName: PetPlantDetails['dictionaryPlant']['name'];
  imageUrl: PetPlantDetails['imageUrl'];
}

const Profile = (props: ProfileProps) => {
  const { nickname, dictionaryPlantName, imageUrl } = props;

  return (
    <Section>
      <Image type="circle" size="200px" src={imageUrl} alt={`사랑스러운 ${nickname}의 사진`} />
      <Nickname>{nickname}</Nickname>
      <DictionaryPlantName>{dictionaryPlantName}</DictionaryPlantName>
    </Section>
  );
};

export default Profile;
