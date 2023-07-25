import { Children, isValidElement } from 'react';

/**
 * 직속 자녀들 중 특정 컴포넌트만 추려냅니다.
 * @param childElement 찾고 싶은 컴포넌트
 * @param childrenProp 이 함수를 사용하는 컴포넌트의 `children` prop
 * @param count 최대 몇 개까지 찾을 것인지
 * @returns 찾은 컴포넌트들의 배열
 */
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
