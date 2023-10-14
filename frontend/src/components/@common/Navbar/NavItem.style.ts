import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 100%;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  height: 48px;

  & > * {
    transition: all 0.3s ease-out;
  }
`;

export const Text = styled.p<{ $isActive?: boolean }>`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: ${({ $isActive, theme: { color } }) =>
    $isActive ? color.fontPrimaryForBackground : color.subLight};
`;
