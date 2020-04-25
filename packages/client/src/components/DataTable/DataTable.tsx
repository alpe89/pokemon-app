import * as React from 'react';

import Table from 'antd/es/table';
import Tag from 'antd/es/tag';
import Button from 'antd/es/button';

interface Props {
  data: any,
  getNextPage: () => void
}

const typeColor = new Map<string, string>([
  ["Fire", "volcano"],
  ["Water", "blue"],
  ["Poison", "violet"],
  ["Ghost", "black"],
  ["Flying", "cyan"],
  ["Grass", "green"],
  ["Electric", "yellow"],
  ["Psychic", "indigo"],
  ["Bug", "lime"],
  ["Ground", "brown"],
  ["Normal", "lightgray"],
  ["Fairy", "pink"],
  ["Fighting", "#ff5722"],
  ["Rock", "#616161"],
  ["Ice", "aqua"],
  ["Dragon", "geekblue"]
]);

const typesFilters: any[] = [];

for (let [k, _] of typeColor) {
  typesFilters.push({
    text: k,
    value: k
  });
}

const DataTable: React.FC<Props> = ({ data, getNextPage }) => {

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Known as',
      dataIndex: 'classification',
      key: 'classification',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Types',
      key: 'types',
      dataIndex: 'types',
      filters: typesFilters,
      onFilter: (value: string, record: any) => record.types.includes(value),
      render: (types: string[], record: any) => (
        <span>
          {types.map(type => {
            const color = typeColor.get(type) ? typeColor.get(type) : 'gray';

            return (
              <Tag color={color} key={`${record.id}-${type}`}>
                {type.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
  ];

  const dataArray = data.pokemons.edges.map((edge: any) => {
    return { key: edge.node.id, ...edge.node };
  });

  return (
    <>
      <Table columns={columns} dataSource={dataArray} pagination={false} />
      {
        data.pokemons.pageInfo.hasNextPage ?
          <Button type="primary" block onClick={getNextPage}>Load More Data</Button> :
          null
      }
    </>
  );
};

export default DataTable;