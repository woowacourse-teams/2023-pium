import { useNavigate } from 'react-router-dom';
import SearchBox from 'components/SearchBox';
import { Message, SearchBoxArea, Wrapper } from './Search.style';

const PetRegisterSearch = () => {
  const navigate = useNavigate();

  const navigateRegister = (id: number) => {
    navigate(`/pet/register/${id}`);
  };

  return (
    <Wrapper>
      <Message>어떤 식물을 키우시나요?</Message>
      <SearchBoxArea>
        <SearchBox onSelect={navigateRegister} />
      </SearchBoxArea>
    </Wrapper>
  );
};

export default PetRegisterSearch;
