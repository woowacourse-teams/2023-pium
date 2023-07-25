import { generatePath, useNavigate } from 'react-router-dom';
import SearchBox from 'components/SearchBox';
import { Message, SearchBoxArea, Wrapper } from './Search.style';
import { URL_PATH } from 'constants/index';

const PetRegisterSearch = () => {
  const navigate = useNavigate();

  const navigateForm = (id: number) => {
    navigate(generatePath(URL_PATH.PET_REGISTER_FORM, { id: String(id) }));
  };

  return (
    <Wrapper>
      <Message>어떤 식물을 키우시나요?</Message>
      <SearchBoxArea>
        <SearchBox onResultClick={navigateForm} />
      </SearchBoxArea>
    </Wrapper>
  );
};

export default PetRegisterSearch;
