import SvgStroke, { ICONS } from 'components/@common/SvgIcons/SvgStroke';
import { Wrapper, Center, Text } from './NavItem.style';
import theme from 'style/theme.style';

interface NavItemProps {
  isActive: boolean;
  iconId: typeof ICONS[number];
  label: string;
}

const NavItem = (props: NavItemProps) => {
  const { isActive, iconId, label } = props;
  const iconColor = isActive ? theme.color.fontPrimaryForBackground : theme.color.subLight;

  return (
    <Wrapper>
      <Center>
        <SvgStroke color={iconColor} size={24} icon={iconId} />
        <Text $isActive={isActive}>{label}</Text>
      </Center>
    </Wrapper>
  );
};

export default NavItem;
