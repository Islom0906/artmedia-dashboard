import {Button, Popconfirm, Space, Table ,Image} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const HouseTable = ({data,deleteHandle ,editHandle}) => {
    const Delete = async (id) => {
        deleteHandle('/location',id)
    };
    const Edit = (id) => {
        editHandle('led-screen',id)
    };

    const columns = [
        {
            title: 'Локация',
            dataIndex: 'address',
            id: 'address',
            render: (address) => <p>{address}</p>,
        },
        {
            title: 'Регион',
            dataIndex: 'passportID',
            id: 'passportID',
            render: (passportID) => <p>{passportID}</p>,
        },
        {
            title: 'Pixel экрана',
            dataIndex: 'screenPixel',
            id: 'screenPixel',
            render: (screenPixel) => <p>{screenPixel}</p>,
        },
        {
            title: 'Событие',
            id: 'action',
            render: (_, record) => (
                <Space size={20}>
                    <Button
                        onClick={() => Edit(record._id)}
                        type='primary'
                        icon={<EditOutlined />}>
                    </Button>
                    <Popconfirm
                        title={'Вы уверены, что хотите удалить этот экран?'}
                        description={'удалить элемент '}
                        onConfirm={() => Delete(record._id)}>
                        <Button type='danger' icon={<DeleteOutlined />}>
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record._id}
            />
        </div>
    );
};





export default HouseTable;