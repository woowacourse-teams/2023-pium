import { Wrapper } from './Tag.style';

export type TagVariantType = 'default' | 'primary' | 'sub' | 'accent';
export interface TagProps extends React.PropsWithChildren {
  variant?: TagVariantType;
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
