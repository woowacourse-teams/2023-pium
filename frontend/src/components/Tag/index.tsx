import { Wrapper } from './Tag.style';

export interface TagProps extends React.PropsWithChildren {
  variant?: 'default' | 'primary' | 'sub' | 'accent';
  dimmed?: boolean;
  fullWidth?: boolean;
  hasHoverEffect?: boolean;
}

const Tag = (props: TagProps) => {
  const {
    children,
    variant = 'default',
    dimmed = true,
    hasHoverEffect = false,
    fullWidth = false,
  } = props;

  return (
    <Wrapper
      $variant={variant}
      $dimmed={dimmed}
      $hasHoverEffect={hasHoverEffect}
      $fullWidth={fullWidth}
    >
      {children}
    </Wrapper>
  );
};

export default Tag;
