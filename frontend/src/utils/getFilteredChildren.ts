import { Children, isValidElement } from 'react';

const getFilteredChildren = (
  childElement: JSX.Element,
  childrenProp: React.ReactNode,
  count?: number
) => {
  const children = Children.toArray(childrenProp);

  return children
    .filter((child) => isValidElement(child) && child.type === childElement.type)
    .slice(0, count);
};

export default getFilteredChildren;
