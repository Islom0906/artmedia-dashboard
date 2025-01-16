


import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button, Col, Input, notification, Row, Space, Spin, Typography} from "antd";
import React, {useEffect,  useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {  useDeleteQuery, useGetQuery} from "../../service/query/Queries";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import LedScreenTable from "../../components/LedScreenTable";
const {Title}=Typography


const Dashboard = () => {
    const navigate = useNavigate()
    const {mutate,isSuccess,isLoading:deleteLoading}=useDeleteQuery()
    const {data:getLocation,isLoading:isloadingGetLocation,refetch:refetchGetLocation}=useGetQuery(false,'get-location',`/location` , false)
    const [search, setSearch] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const ScreenMD = useBreakpoint().md;
    const editHandle = (  path ,id) => {
        navigate(`/${path}/add?editId=${id}`)
    };

    // delete
    const deleteHandle = (url, id) => {
        mutate({url, id});
    };

    // add
    const addArticle = () => {
        navigate('/led-screen/add');
    };
    const searchFunc = (value) => {
        if (value === '') {
            setIsSearch(false);
        } else {
            setIsSearch(true);
        }
        const filterData = getLocation?.filter(
            (data) => data?.address.toLowerCase().includes(value.toLowerCase()));
        setSearch(filterData);
    }

    useEffect(() => {
        refetchGetLocation()
    } ,[isSuccess])


    return (
        <div className={'site-space-compact-wrapper'}>
            <Space direction={'vertical'} size={"large"} style={{width: '100%'}}>
                <Row gutter={[10 , 20]}>
                    <Col span={18}>
                        <Title className={'page--title'} level={2}>
                            Led экраны
                        </Title>
                    </Col>
                    <Col span={16}>
                        <Input placeholder="Поиск Led экраны" onChange={(e) => searchFunc(e.target.value)} />
                    </Col>
                    <Col span={8}>
                        <Button
                            type='primary'
                            icon={<PlusOutlined/>}
                            style={{width: '100%'}}
                            onClick={addArticle}>
                            {
                                ScreenMD && 'Добавить'
                            }
                        </Button>
                    </Col>
                </Row>
                <Spin
                    size='medium'
                    spinning={isloadingGetLocation || deleteLoading}>
                    <LedScreenTable
                        data={isSearch ? search : getLocation}
                        deleteHandle={deleteHandle} editHandle={editHandle}
                    />
                </Spin>
            </Space>
        </div>
    );
};

export default Dashboard;
