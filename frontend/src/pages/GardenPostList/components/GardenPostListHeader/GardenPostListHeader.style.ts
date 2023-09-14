import { styled } from 'styled-components';

export const Wrapper = styled.header`
  position: sticky;
  z-index: ${(props) => props.theme.zIndex.fixed};
  top: 0;

  padding: 8px;
  padding-bottom: 0;

  background-color: ${(props) => props.theme.color.background};
`;

export const SelectedDictionaryPlantArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 8px;

  font-size: 2.2rem;
`;

export const GardenName = styled.p`
  display: flex;
  column-gap: 4px;
  align-items: center;

  padding: 8px;

  border-top: solid 2px transparent;
  border-bottom: solid 2px ${(props) => props.theme.color.primary + 'AA'};
`;

export const DeleteFilterButton = styled.button`
  padding: 4px;
  font-size: 1.2rem;
`;