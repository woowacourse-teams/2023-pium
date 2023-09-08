import { HeaderBox, Title } from './ContentHeader.style';

interface ContentHeaderProps {
  title: string;
}

const ContentHeader = ({ title }: ContentHeaderProps) => {
  return (
    <HeaderBox>
      <Title>{title}</Title>
    </HeaderBox>
  );
};

export default ContentHeader;
