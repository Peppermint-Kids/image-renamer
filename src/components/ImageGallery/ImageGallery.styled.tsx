import styled from "styled-components";

export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, auto);
  gap: 8px;
  max-height: 200px;
  min-height: 200px;
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
