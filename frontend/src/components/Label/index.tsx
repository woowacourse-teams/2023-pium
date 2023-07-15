import { Wrapper } from './Label.style';

export interface LabelProps extends React.PropsWithChildren {
  variant?: 'default' | 'primary' | 'sub' | 'accent';
  dimmed?: boolean;
  hasHoverEffect?: boolean;
}

const Label = (props: LabelProps) => {
  const { children, variant = 'default', dimmed = true, hasHoverEffect = false } = props;

  return (
    <Wrapper $variant={variant} $dimmed={dimmed} $hasHoverEffect={hasHoverEffect}>
      {children}
    </Wrapper>
  );
};

export default Label;
