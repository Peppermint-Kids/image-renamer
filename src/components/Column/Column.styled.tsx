import styled from "styled-components";

export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 8px;
  max-height: 200px;
  min-height: 200px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;
