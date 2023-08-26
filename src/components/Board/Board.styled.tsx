import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 8px;
  width: auto;
  height: auto;
  margin-top: 10px;
  overflow-x: auto;
  overflow-y: auto;
  white-space: nowrap;
  box-sizing: border-box;
`;
