import styled from 'styled-components';

export const Wrapper = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 100%;

  border-top: solid 2px
    ${({ $isActive, theme: { color } }) =>
      $isActive ? color.fontPrimaryForBackground : 'transparent'};
  border-bottom: solid 2px transparent;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  height: 48px;
`;

export const Text = styled.p<{ $isActive?: boolean }>`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: ${({ $isActive, theme: { color } }) =>
    $isActive ? color.fontPrimaryForBackground : color.subLight};
`;
