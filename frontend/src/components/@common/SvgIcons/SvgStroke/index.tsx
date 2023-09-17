import { ComponentPropsWithoutRef } from 'react';
import theme from 'style/theme.style';

export const ICONS = [
  'account-circle-line',
  'leaf',
  'home-line',
  'bulletin-board-line',
  'reminder',
  'dictionary',
] as const;

type IconIds = (typeof ICONS)[number];

interface SvgIconsProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height'> {
  icon: IconIds;
  size?: number;
  color?: string;
}

const SvgStroke = ({ icon, size = 24, color = theme.color.gray, ...rest }: SvgIconsProps) => {
  return (
    <svg fill="none" width={size} height={size} stroke={color} {...rest}>
      <use href={`#${icon}`} />
    </svg>
  );
};

export default SvgStroke;
