import styled from 'styled-components';

interface IProps {
  paddingLeft: number;
}

export const Button = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
`;

export const NestedChildren = styled.div<IProps>`
  padding-left: ${(props) =>
    props.paddingLeft ? `${props.paddingLeft}px` : null};
`;
