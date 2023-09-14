import type { ManageLevel as ManageLevelType } from 'types/dictionaryPlant';

interface ManageLevelIconProps extends React.SVGProps<SVGSVGElement> {
  level?: ManageLevelType;
}

const PATH_DATA: Record<ManageLevelType, string> = {
  정보없음: 'M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-6-2h4V14h-4zm-4 2H2V18h8zm-6-2h4v-8H4z',
  초보자: 'M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-6-2h4V14h-4zm-4 2H2V18h8z',
  경험자: 'M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-10 0H2V18h8z',
  전문가: 'M30 30h-8V4h8zm-10 0h-8V12h8zm-10 0H2V18h8z',
};

const ManageLevel = (props: ManageLevelIconProps) => {
  const { level = '정보없음', ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" {...rest}>
      <path fill="currentColor" d={PATH_DATA[level]} />
    </svg>
  );
};

export default ManageLevel;
