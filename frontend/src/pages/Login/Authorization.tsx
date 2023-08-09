import { useEffect } from 'react';
import useKakao from 'hooks/useKakao';

const Authorization = () => {
  const { getToken } = useKakao();
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');

  useEffect(() => {
    if (code !== null) {
      const getData = async () => {
        const token = await getToken(code);
      };
      getData();
    }
  });

  return <></>;
};

export default Authorization;
