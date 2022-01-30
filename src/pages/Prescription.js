import { Form, Input, Button, Space ,InputNumber, Checkbox,Radio} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from "react";

const Pescription = () => {
    const [mkeyboard, msetKeyboard] = React.useState(true);
    const [akeyboard, asetKeyboard] = React.useState(true);
    const [nkeyboard, nsetKeyboard] = React.useState(true);
    const onFinish = values => {
    console.log('Received values of form:', values);
  };

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'medicine']}
                  rules={[{ required: true, message: 'Missing medicine name' }]}
                >
                  <Input placeholder="medicine Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'duration']}
                  rules={[{ required: true, message: 'Duration Missing' }]}
                >
                  <Input placeholder="Duration" />

                </Form.Item>
                


                <Form.Item
                  {...restField}
                  name={[name, 'morning']}
                //   rules={[{ required: true, message: 'Duration Missing' }]}
                >
                    <Space>
                        <InputNumber
                         style={{
                            width: 60,
                          }}
                         min={0}
                         max={10}
                         keyboard={mkeyboard}
                         step="0.5"
                         onChange={(value) =>{console.log('changed', value)}}
                         stringMode  
                        />
                        <Checkbox
                            onChange={() => {
                            msetKeyboard(!mkeyboard);
                            }}
                            checked={mkeyboard}
                        >
                            morning
                        </Checkbox>
                    </Space>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'Afternoon']}
                //   rules={[{ required: true, message: 'Duration Missing' }]}
                >
                    <Space>
                        <InputNumber 
                         style={{
                            width: 60,
                          }}
                         min={0}
                         max={10}
                         keyboard={akeyboard}
                         step="0.5"
                         onChange={(value) =>{console.log('changed', value)}}
                         stringMode/>
                        <Checkbox
                            onChange={() => {
                            asetKeyboard(!akeyboard);
                            }}
                            checked={akeyboard}
                        >
                            Afternoon
                        </Checkbox>
                    </Space>
                </Form.Item>
                

                <Form.Item
                  {...restField}
                  name={[name, 'night']}
                //   rules={[{ required: true, message: 'Duration Missing' }]}
                >
                    <Space>
                        <InputNumber
                         style={{
                            width: 60,
                          }}
                         min={0}
                         max={10}
                         keyboard={nkeyboard}
                         step="0.5"
                         onChange={(value) =>{console.log('changed', value)}}
                         stringMode
                         />
                        <Checkbox
                            onChange={() => {
                            nsetKeyboard(!nkeyboard);
                            }}
                            checked={nkeyboard}
                        >
                            night
                        </Checkbox>
                    </Space>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'MedTime']}
                  rules={[{ required: true}]}
                >
                    <Radio.Group  size="small" style={{ marginTop: 16 }}>
                        <Radio value="after">Before Food</Radio>
                        <Radio value="before">After Food</Radio>
                        
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'Instruction']}                
                >
                    <Input.TextArea rows={4} placeholder="Instruction" />
                  {/* <Input placeholder="Instruction" /> */}
                </Form.Item>



                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Pescription;
// ReactDOM.render(<Demo />, mountNode);