import { PropsWithChildren } from 'react';
import Label from '../../Label';

const Content = (props: PropsWithChildren) => {
  const { children } = props;

  return <Label>{children}</Label>;
};

export default Content;
