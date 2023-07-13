import { styled } from 'styled-components';

const App = () => {
  return (
    <div>
      <Font>나눔 스퀘어 라운드입니다.</Font>
      <Common>일반 폰트입니다.</Common>
    </div>
  );
};

export default App;

const Font = styled.p`
  font: ${(props) => props.theme.font.title};
`;

const Common = styled.p`
  font-size: 3.2rem;
`;
