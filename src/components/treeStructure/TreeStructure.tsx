import { useState } from 'react';
import 'boxicons';
import Arrow from '../../assets/image/right-arrow.png';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';
import styled, { ThemeProvider } from 'styled-components';

const files = {
  children: [
    {
      name: 'node_modules',
      children: [
        {
          name: 'joi',
          children: [
            {
              name: 'node_modules',
            },
            {
              name: 'package.json',
            },
          ],
        },
      ],
    },
    {
      name: 'package.json',
    },
    {
      name: 'vite.config.ts',
    },
  ],
};

type TEntry = {
  name: string;
  children?: TEntry[];
};

interface IProps {
  paddingLeft?: number;
  collapse?: boolean;
  theme?: boolean;
}

const lightTheme = {
  colorPrimary: '#0060df',
  colorSecondary: '#fbfbfe',
  colorAccent: '#fd6f53',
  fontColor: '#000000',
  filter:
    'invert(0%) sepia(11%) saturate(5147%) hue-rotate(194deg) brightness(96%) contrast(102%)',
};

const darkTheme = {
  colorPrimary: '#17ed90',
  colorSecondary: '#2a2c2d',
  colorAccent: '#12cdea',
  fontColor: '#ffffff',
  filter:
    'invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)',
};

const AppContainer = styled.div<{ theme: any }>`
  width: 240px;
  background: ${({ theme }) => theme.colorSecondary};

  height: 100vh;
  padding: 8px;
`;

const FolderName = styled.div<{ theme: any }>`
  line-height: 32px;
  color: ${({ theme }) => theme.fontColor};
`;

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

const NestedChildren = styled.div<IProps>`
  padding-left: ${(props) =>
    props.paddingLeft ? `${props.paddingLeft}px` : null};
`;

const ArrowImage = styled.img<IProps>`
  width: 10px;
  height: 10px;
  margin-right: 5px;

  rotate: ${(props) => (props.collapse ? '90deg' : null)};

  filter: ${({ theme }) => theme.filter};

  /* filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%)
    contrast(103%); */
`;

const Entry = ({ entry, depth }: { entry: TEntry; depth: number }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div>
      {entry.children ? (
        <Button onClick={() => setCollapse(!collapse)}>
          <ArrowImage collapse={collapse} src={Arrow} alt='' />
          <FolderName>{entry.name}</FolderName>
        </Button>
      ) : (
        <FolderName>{entry.name}</FolderName>
      )}

      {collapse && (
        <NestedChildren paddingLeft={depth * 10}>
          {entry.children?.map((entry) => (
            <Entry entry={entry} depth={depth + 1} key={entry.name} />
          ))}
        </NestedChildren>
      )}
    </div>
  );
};

const TreeStructure = () => {
  const [theme, setTheme] = useState(false);

  const handleThemeToggle = (theme: boolean) => {
    setTheme(theme);
  };

  return (
    <>
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <ThemeSwitcher handleThemeToggle={handleThemeToggle} />
        <AppContainer>
          {files.children.map((entry) => (
            <Entry entry={entry} depth={1} key={entry.name} />
          ))}
        </AppContainer>
      </ThemeProvider>
    </>
  );
};

export default TreeStructure;
