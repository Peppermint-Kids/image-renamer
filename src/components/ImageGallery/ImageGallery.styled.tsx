import styled from "styled-components";

export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  gap: 8px;
  grid-auto-flow: columns;
  max-height: 300px;
  min-height: 100px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<{ isDragging?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 300px;
  height: 400px;
  margin-right: 20px;
  flex: 1 0 auto;
  position: relative;
  ${({ isDragging }) => isDragging && "opacity: 0.6;"}
`;

export const Row = styled.div`
  width: 100px;
  height: 50px;
`;
