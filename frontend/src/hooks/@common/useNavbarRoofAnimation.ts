import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { isShowPageLoadingState } from 'store/atoms/@common';
import { URL_PATH } from 'constants/index';
import useChildrenLeftPositions from './useChildrenLeftPositions';

const getRoofPosition = (pathname: string) => {
  switch (pathname) {
    case URL_PATH.main:
      return 1;
    case URL_PATH.garden:
      return 2;
    case URL_PATH.reminder:
      return 3;
    case URL_PATH.petList:
      return 4;
    case URL_PATH.myPage:
      return 5;
    default:
      return null;
  }
};

const getAnimationOffset = (prevPathname: string, currentPathname: string, positions: number[]) => {
  const prevRoofPosition = getRoofPosition(prevPathname);
  const roofPosition = getRoofPosition(currentPathname);

  const transitionOffset =
    roofPosition && prevRoofPosition
      ? positions[prevRoofPosition - 1] - positions[roofPosition - 1]
      : 0;

  return transitionOffset !== 0 ? transitionOffset + Math.random() : 0;
};

const useNavbarRoofAnimation = (prevPathname: string, currentPathname: string) => {
  const navbarRef = useRef<HTMLElement>(null);
  const isPageLoading = useRecoilValue(isShowPageLoadingState);

  const navItemPositions = useChildrenLeftPositions(navbarRef);

  const roofPosition = getRoofPosition(isPageLoading ? prevPathname : currentPathname);
  const transitionOffset = !isPageLoading
    ? getAnimationOffset(prevPathname, currentPathname, navItemPositions)
    : 0;

  return { navbarRef, roofPosition, transitionOffset };
};

export default useNavbarRoofAnimation;
