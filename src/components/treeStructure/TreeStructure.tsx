import { useState } from 'react';
import 'boxicons';
import Arrow from '../../assets/image/right-arrow.png';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';
import * as Styles from './style';

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
const Entry = ({ entry, depth }: { entry: TEntry; depth: number }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div>
      {entry.children ? (
        <Styles.Button onClick={() => setCollapse(!collapse)}>
          <Styles.ArrowImage collapse={collapse} src={Arrow} alt='' />
          <Styles.FolderName>{entry.name}</Styles.FolderName>
        </Styles.Button>
      ) : (
        <Styles.FolderName>{entry.name}</Styles.FolderName>
      )}

      {collapse && (
        <Styles.NestedChildren paddingLeft={depth * 10}>
          {entry.children?.map((entry) => (
            <Entry entry={entry} depth={depth + 1} key={entry.name} />
          ))}
        </Styles.NestedChildren>
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
      <ThemeSwitcher handleThemeToggle={handleThemeToggle} />
      <Styles.AppContainer theme={theme}>
        {files.children.map((entry) => (
          <Entry entry={entry} depth={1} key={entry.name} />
        ))}
      </Styles.AppContainer>
    </>
  );
};

export default TreeStructure;
