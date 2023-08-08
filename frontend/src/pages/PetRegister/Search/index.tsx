import { generatePath, useNavigate } from 'react-router-dom';
import Navbar from 'components/@common/Navbar';
import SearchBox from 'components/search/SearchBox';
import { Wrapper, Message, SearchBoxArea } from './Search.style';
import { URL_PATH } from 'constants/index';

const PetRegisterSearch = () => {
  const navigate = useNavigate();

  const navigateForm = (id: number) => {
    navigate(generatePath(URL_PATH.petRegisterForm, { id: String(id) }));
  };

  return (
    <>
      <Wrapper>
        <Message>어떤 식물을 키우시나요?</Message>
        <SearchBoxArea>
          <SearchBox onResultClick={navigateForm} />
        </SearchBoxArea>
      </Wrapper>
      <Navbar />
    </>
  );
};

export default PetRegisterSearch;
