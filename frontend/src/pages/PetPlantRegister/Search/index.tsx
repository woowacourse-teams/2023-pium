import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Navbar from 'components/@common/Navbar';
import SearchBox from 'components/search/SearchBox';
import { Wrapper, Message, SearchBoxArea } from './Search.style';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import { URL_PATH } from 'constants/index';

const PetPlantRegisterSearch = () => {
  const navigate = useNavigate();
  useCheckSessionId();

  const [searchValue, setSearchValue] = useState('');

  const navigateForm = ({ id }: DictionaryPlantNameSearchResult) => {
    navigate(generatePath(URL_PATH.petRegisterForm, { id: String(id) }));
  };

  return (
    <>
      <Wrapper>
        <Message>어떤 식물을 키우시나요?</Message>
        <SearchBoxArea>
          <SearchBox
            value={searchValue}
            onChangeValue={setSearchValue}
            onResultClick={navigateForm}
          />
        </SearchBoxArea>
      </Wrapper>
      <Navbar />
    </>
  );
};

export default PetPlantRegisterSearch;
