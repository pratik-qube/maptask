import styled from "styled-components";

export const LocationRow = styled.div`
  height: 46px;
  width: 100%;
  border: 1px dashed grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  ${(props) => (props.disabled ? "background:lightgrey" : "")}
`;
