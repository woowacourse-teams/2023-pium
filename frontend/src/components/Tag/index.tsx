import { Wrapper } from './Tag.style';

export interface TagProps extends React.PropsWithChildren {
  variant?: 'default' | 'primary' | 'sub' | 'accent';
  dimmed?: boolean;
  hasHoverEffect?: boolean;
}

const Tag = (props: TagProps) => {
  const { children, variant = 'default', dimmed = true, hasHoverEffect = false } = props;

  return (
    <Wrapper $variant={variant} $dimmed={dimmed} $hasHoverEffect={hasHoverEffect}>
      {children}
    </Wrapper>
  );
};

export default Tag;
