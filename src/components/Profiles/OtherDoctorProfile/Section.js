import React from 'react';
import { Table, Divider } from 'antd';

function Section({ label, dataSource, }) {
  const columns = [
    {
      title: 'Prop',
      dataIndex: 'prop',
      key: 'prop',
      fixed: 'left',
      width: 120,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];
  return (
    <Table 
      pagination={{ hideOnSinglePage: true }} 
      fixed={true} 
      size="small"
      title={() => (<Divider>{label}</Divider>)}
      scroll={{ x: 800 }} 
      showHeader={false} 
      dataSource={dataSource} 
      columns={columns} 
    />
  );
}

export default Section;
