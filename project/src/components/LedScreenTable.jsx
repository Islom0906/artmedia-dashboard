import {Button, Popconfirm, Space, Table ,Image} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {FaRegEye} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
const regionsOfUzbekistan = [
    { text: 'Ташкент', value: 'Ташкент' },
    { text: 'Андижанская область', value: 'Андижанская область' },
    { text: 'Бухарская область', value: 'Бухарская область' },
    { text: 'Джизакская область', value: 'Джизакская область' },
    { text: 'Кашкадарьинская область', value: 'Кашкадарьинская область' },
    { text: 'Навоийская область', value: 'Навоийская область' },
    { text: 'Наманганская область', value: 'Наманганская область' },
    { text: 'Самаркандская область', value: 'Самаркандская область' },
    { text: 'Сурхандарьинская область', value: 'Сурхандарьинская область' },
    { text: 'Сырдарьинская область', value: 'Сырдарьинская область' },
    { text: 'Ташкентская область', value: 'Ташкентская область' },
    { text: 'Ферганская область', value: 'Ферганская область' },
    { text: 'Хорезмская область', value: 'Хорезмская область' },
    { text: 'Республика Каракалпакстан', value: 'Республика Каракалпакстан' }
];
const HouseTable = ({data,deleteHandle ,editHandle}) => {
    const navigate = useNavigate();

    const Delete = async (id) => {
        deleteHandle('/location',id)
    };
    const Edit = (id) => {
        editHandle('led-screen',id)
    };
    const handleUserProfile = (id) => {
        navigate(`/led-screen/${id}`);
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
            dataIndex: 'region',
            id: 'region',
            filters: [...regionsOfUzbekistan],
            onFilter: (value, record) => record.region.indexOf(value) === 0,
            // render: (region) => <p>{region}</p>,
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
                    <Button onClick={() => handleUserProfile(record?._id)} type="primary">
                        <FaRegEye />
                    </Button>
                    <Button
                        onClick={() => Edit(record?._id)}
                        type='primary'
                        icon={<EditOutlined />}>
                    </Button>
                    <Popconfirm
                        title={'Вы уверены, что хотите удалить этот экран?'}
                        description={'удалить элемент '}
                        danger
                        onConfirm={() => Delete(record?._id)}>
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