import styled from 'styled-components';

interface IProps {
  paddingLeft?: number;
  collapse?: boolean;
  theme?: boolean;
}

export const Button = styled.button`
  width: 100%;
  background: transparent;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  padding: 0;
  line-height: 32px;
`;

export const FolderName = styled.div`
  line-height: 32px;
  color: #f0f6fc;
`;

export const NestedChildren = styled.div<IProps>`
  padding-left: ${(props) =>
    props.paddingLeft ? `${props.paddingLeft}px` : null};
`;

export const ArrowImage = styled.img<IProps>`
  width: 10px;
  height: 10px;
  margin-right: 5px;

  rotate: ${(props) => (props.collapse ? '90deg' : null)};

  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%)
    contrast(103%);
`;

export const AppContainer = styled.div<IProps>`
  width: 240px;
  /* background: #2c2c2c; */
  background: ${({ theme }) => (theme ? '#2c2c2c' : '#fff')};

  height: 100vh;
  padding: 8px;
`;
