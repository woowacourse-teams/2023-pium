import { Link } from 'react-router-dom';
import { Wrapper } from './Footer.style';
import { URL_PATH } from 'constants/index';

const Footer = () => {
  return (
    <Wrapper>
      <Link to={URL_PATH.privacy}>개인정보 처리 방침</Link>
      <p>
        contact:<a href={`mailto: easyplantscheduler@gmail.com`}> easyplantscheduler@gmail.com</a>
      </p>
      <p>©️ 피움 All rights reserved</p>
    </Wrapper>
  );
};

export default Footer;
