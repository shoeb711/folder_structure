import { useState } from 'react';
import 'boxicons';
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

const TreeStructure = () => {
  const Entry = ({ entry, depth }: { entry: TEntry; depth: number }) => {
    const [collapse, setCollapse] = useState(false);

    return (
      <div>
        {entry.children ? (
          <Styles.Button onClick={() => setCollapse(!collapse)}>
            {collapse ? '-' : '+'} {entry.name}
          </Styles.Button>
        ) : (
          <div>{entry.name}</div>
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

  return (
    <div>
      {files.children.map((entry) => (
        <Entry entry={entry} depth={1} key={entry.name} />
      ))}
    </div>
  );
};

export default TreeStructure;
