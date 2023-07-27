import { ToastContext } from 'contexts/toastContext';
import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'styled-components';
import { ERROR } from 'constants/index';
import Toast from '.';

const ToastList = () => {
  const root = document.getElementById('toast-root') ?? document.body;

  const context = useContext(ToastContext);

  if (context === null) throw Error(ERROR.toastContext);

  const toasts = context.toastList.map((props, idx) => <Toast key={props.id + idx} {...props} />);

  return createPortal(<Wrapper>{toasts}</Wrapper>, root);
};

export default ToastList;

const Wrapper = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;

  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
