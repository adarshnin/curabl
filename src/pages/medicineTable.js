import { Table } from 'antd';
export default function MedicineTable() {
    const columns = [
        {
            title: 'Medicines',
            dataIndex: 'Medicines',
            width: 150,
        },
        {
            title: 'Quantity',
            dataIndex: 'Quantity',
            width: 150,
        },

    ];

    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            Medicines: `Edward King ${i}`,
            Quantity: i
        });
    }
    return (
        <>
            <Table style={{ width: "50%" }} columns={columns} dataSource={data} scroll={{ y: 240 }} />
        </>
    );

}

