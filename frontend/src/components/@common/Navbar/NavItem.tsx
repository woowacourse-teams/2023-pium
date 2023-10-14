import SvgStroke, { ICONS } from 'components/@common/SvgIcons/SvgStroke';
import { Wrapper, Center, Text } from './NavItem.style';
import theme from 'style/theme.style';

const NavItem = (props: { path: string; iconId: typeof ICONS[number]; label: string }) => {
  const { path, iconId, label } = props;

  const isActive = path === location.pathname;

  const iconColor = isActive ? theme.color.fontPrimaryForBackground : theme.color.subLight;

  return (
    <Wrapper $isActive={isActive}>
      <Center>
        <SvgStroke color={iconColor} size={24} icon={iconId} />
        <Text $isActive={isActive}>{label}</Text>
      </Center>
    </Wrapper>
  );
};

export default NavItem;
