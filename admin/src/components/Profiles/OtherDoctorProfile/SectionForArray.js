import React from 'react';
import { Divider, Collapse, List, } from 'antd';

const { Panel } = Collapse;

function SectionForArray({ title, labels, values, }) {
  return (
    <>
    {!(values?.every(item => item === undefined)) &&
      <Divider plain>
        <h1>
          {title}
        </h1>
      </Divider>}
      {labels.map((label, i) => {
        console.log(values[i], !(values[i]?.every(item => item === undefined)), values[i]?.length > 0)
        return (
          values[i] && !(values[i]?.every(item => item === undefined)) && values[i]?.length > 0 &&
          <Collapse>
            <Panel showArrow={false}
              key={i}
              header={label}>
              <List key={i} dataSource={values[i]} renderItem={item => <List.Item>{item}</List.Item>} />
            </Panel>
          </Collapse>
        )
      })}

    </>
  );
}

export default SectionForArray;
