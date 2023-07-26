import Calendar from 'components/@common/Icons/Calendar';
import Home from 'components/@common/Icons/Home';
import Plant from 'components/@common/Icons/Plant';
import Reminder from 'components/@common/Icons/Reminder';
import theme from '../../../style/theme.style';
import { NavItem, NavItemArea, NavLabel, NavLink, Wrapper } from './Navbar.style';
import { URL_PATH } from 'constants/index';

type PathKey = keyof typeof URL_PATH;
type Path = (typeof URL_PATH)[PathKey];

interface NavbarProps {
  currentPath: Path;
}

const Navbar = ({ currentPath }: NavbarProps) => {
  const navItems = [
    {
      path: URL_PATH.main,
      label: '메인',
      Icon: Home,
    },
    {
      path: URL_PATH.calendar,
      label: '캘린더',
      Icon: Calendar,
    },
    {
      path: URL_PATH.reminder,
      label: '리마인더',
      Icon: Reminder,
    },
    {
      path: URL_PATH.petList,
      label: '내 식물',
      Icon: Plant,
    },
  ];

  return (
    <Wrapper>
      {navItems.map(({ path, label, Icon }, index) => {
        const active = currentPath === path;
        return (
          <NavLink key={index} to={path}>
            <NavItemArea $active={active}>
              <NavItem>
                <Icon stroke={active ? theme.color.primary : '#888888'} />
                <NavLabel $active={active}>{label}</NavLabel>
              </NavItem>
            </NavItemArea>
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

export default Navbar;
