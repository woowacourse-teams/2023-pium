import { Wrapper } from './DictionaryDetail.style';
import useDictionaryPlants from 'hooks/useDictionaryPlants';

const DictionaryDetail = () => {
  // const { id } = useParams();
  const { dictionary } = useDictionaryPlants('1');

  return (
    <Wrapper>
      <section>
        <div>
          <p>{dictionary?.familyName}</p>
          <p>{dictionary?.name}</p>
        </div>
        <img src={dictionary?.image} alt={dictionary?.name} />
      </section>
      <section></section>
    </Wrapper>
  );
};

export default DictionaryDetail;
