import { ComponentPropsWithoutRef } from 'react';
import theme from 'style/theme.style';

export const ICONS = [
  'account-circle',
  'arrow-drop-down',
  'arrow-left',
  'arrow-right',
  'arrow-right-all',
  'calendar',
  'check-box-empty',
  'check-box-fill',
  'check-circle',
  'close-circle',
  'crown',
  'dictionary',
  'flowerpot',
  'fragrance',
  'home',
  'house',
  'humidity',
  'info-circle',
  'kakao-login-large',
  'line-arrow-left',
  'manage-level-정보없음',
  'manage-level-초보자',
  'manage-level-경험자',
  'manage-level-전문가',
  'plant',
  'potted-plant',
  'reminder',
  'search',
  'stopwatch',
  'sun',
  'thermometer-snow',
  'thermometer-sun',
  'tree-plant-pot',
  'warning',
  'water',
  'wind',
] as const;

type IconIds = (typeof ICONS)[number];

interface SvgIconsProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height'> {
  icon: IconIds;
  size?: number;
  color?: string;
}

const SvgIcons = ({ icon, size = 24, color = theme.color.gray, ...rest }: SvgIconsProps) => {
  return (
    <svg fill={color} width={size} height={size} {...rest}>
      <use href={`#${icon}`} />
    </svg>
  );
};

export default SvgIcons;
