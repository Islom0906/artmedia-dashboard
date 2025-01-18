import React, {useEffect, useMemo, useState} from "react";
import {Row, Col, Typography, Button, Card, Drawer, Space,Tooltip,Divider} from "antd";
// import './HomeApp.css'
import {FieldTimeOutlined, PlusOutlined} from "@ant-design/icons";
import {BsArrowsFullscreen} from "react-icons/bs";
import {MdOutlineScreenshotMonitor} from "react-icons/md";
import {IoMdTime} from "react-icons/io";
import {RiPassPendingLine} from "react-icons/ri";
import {FaQuestion} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {BarChart, PieChart, RefererChart} from "../../components";
import {useNavigate, useParams} from "react-router-dom";
import {useGetByIdQuery} from "../../service/query/Queries";

const { Title , Text } = Typography;





const LedScreenInner = () => {
    const [visible, setVisible] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [isPercentage, setIsPercentage] = useState(false);
    const [isDaily , setIsDaily] = useState(false);
    const togglePercentage = () => setIsPercentage((prev) => !prev);
    const { id } = useParams();
    const navigate = useNavigate()
    const {
        data: getByIdLedScreen,
        refetch: refetchLedScreenGetById,
        isLoading: isLoadingGetById,
    } = useGetByIdQuery(false, "LedScreen", id, '/location');
    const {
        data: getByIdLedScreenStatistics,
        refetch: refetchLedScreenGetByIdStatistics,
        isLoading: isLoadingGetByIdStatistics,
    } = useGetByIdQuery(false, "statistics", id, '/location/calculator');
    const addArticle = () => {
        navigate(`/led-screen/statistics-add?selectID=${getByIdLedScreen?._id}&toHour=${getByIdLedScreen?.toHour}&fromHour=${getByIdLedScreen?.fromHour}`);
    };

    const showDrawer = () => setVisible(true);
    const hideDrawer = () => setVisible(false);
    const info = useMemo(() => {
        const count = [
            {
                today: "Pixel экрана",
                title: getByIdLedScreen?.screenPixel,
                icon: <MdOutlineScreenshotMonitor style={{fontSize:24 , color:"white"}} />,
            },
            {
                today: "Размер экрана",
                title: getByIdLedScreen?.screenSize,
                icon: < BsArrowsFullscreen style={{fontSize:24 , color:"white"}} />,
            },
            {
                today: " Bремя трансляции (в день)",
                title: getByIdLedScreen?.toHour - getByIdLedScreen?.fromHour,
                icon: <IoMdTime style={{fontSize:24 , color:"white"}} />,
            },
            {
                today: " Паспорт объекта",
                title: getByIdLedScreen?.passportID,
                icon: <RiPassPendingLine style={{fontSize:24 , color:"white"}}  />,
            },
        ];
        return count

    } , [getByIdLedScreen])
    useEffect(() => {
        if(id) {
            refetchLedScreenGetById();
            refetchLedScreenGetByIdStatistics()
        }
    }, []);





    const TimeViews = useMemo(() =>{
        const  dataTimeViews= [
            { value: getByIdLedScreenStatistics?.statistics?.timeViews?.workingDay, name: 'Рабочий дни' },
            { value: getByIdLedScreenStatistics?.statistics?.timeViews?.offDay, name: 'Выходные дни' },
            { value: getByIdLedScreenStatistics?.statistics?.timeViews?.nightVision, name: 'Ночное время' },
        ]

        return dataTimeViews
    } , [getByIdLedScreenStatistics ,isPercentage])
    const AgeViews = useMemo(() =>{
        const  dataAgeViews= [
            { value: getByIdLedScreenStatistics?.statistics?.age?.young, name: '0-16 ' },
            { value: getByIdLedScreenStatistics?.statistics?.age?.middleAge, name: '17-60 ' },
            { value: getByIdLedScreenStatistics?.statistics?.age?.oldAge, name: '61-100 ' },
        ]
        return dataAgeViews
    } , [getByIdLedScreenStatistics ,isPercentage])
    const PassengerViews = useMemo(() =>{
        const  dataPassengerViews= [
            { value: getByIdLedScreenStatistics?.statistics?.passenger?.auto, name: 'Авто' },
            { value: getByIdLedScreenStatistics?.statistics?.passenger?.bus, name: 'Автобус' },
            { value: getByIdLedScreenStatistics?.statistics?.passenger?.onFoot, name: 'Пеший' },
            { value: getByIdLedScreenStatistics?.statistics?.passenger?.bike, name: 'Велосипед' },
            { value: getByIdLedScreenStatistics?.statistics?.passenger?.otherTransport, name: 'И другие виды транспорта' },
        ]
        return dataPassengerViews
    } , [getByIdLedScreenStatistics ,isPercentage])


    const ViewsMonthSeconds = useMemo(() =>{
        const  dataViewsMonthSeconds= [
                { value: getByIdLedScreenStatistics?.statistics?.viewsMonthSeconds?.viewSeconds, name: 'Ролик IYB' },
                { value: getByIdLedScreenStatistics?.statistics?.viewsMonthSeconds?.otherSeconds, name: 'Другие ролики' },
        ]
        return dataViewsMonthSeconds
    } , [getByIdLedScreenStatistics ,isPercentage])



    const offDaysStatisticData = useMemo( () => {
        const a= getByIdLedScreenStatistics?.statistics?.offDaysStatistic

        return {
            labels: a?.map(item => item?.hour),
            values:  isPercentage ? a?.map(item => item?.viewsNumberMonthPercent) : a?.map(item => item?.viewsNumberMonth),
        };
    } , [getByIdLedScreenStatistics ,isPercentage])
    const workingDaysStatisticData = useMemo( () => {
        const a= getByIdLedScreenStatistics?.statistics?.workingDaysStatistic
        return {
            labels: a?.map(item => item?.hour),
            values:  isPercentage ? a?.map(item => item?.viewsNumberMonthPercent) : a?.map(item => item?.viewsNumberMonth),
        };
    } , [getByIdLedScreenStatistics])
    const offDaysStatisticInMyVideoData = useMemo( () => {
        const a= getByIdLedScreenStatistics?.statistics?.offDaysStatisticInMyVideo
        return {
            labels: a?.map(item => item?.hour),
            values:  isPercentage ? a?.map(item => item?.viewsNumberMonthMyVideoPercent) : a?.map(item => item?.viewsNumberMonthMyVideo),
        };
    } , [getByIdLedScreenStatistics ,isPercentage])
    const workingDaysStatisticInMyVideoData = useMemo( () => {

        const a = getByIdLedScreenStatistics?.statistics?.workingDaysStatisticInMyVideo
        return {
            labels: a?.map(item => item?.hour),
            values:  isPercentage ? a?.map(item => item?.viewsNumberMonthMyVideoPercent) :  a?.map(item => item?.viewsNumberMonthMyVideo),
        };
    } , [getByIdLedScreenStatistics ,isPercentage])





    return (
        <>
            <Drawer
                className="settings-drawer"
                mask={true}
                width={360}
                onClose={hideDrawer}
                open={visible}
                placement={'right'}
            >
                <div layout="vertical">
                        <Title level={4}>
                            Информация
                        </Title>
                    <Row  gutter={[12 , 12]}>
                        {info.map((c, index) => (
                            <Col
                                key={index}
                                span={24}
                            >
                                <Card bordered={false} style={{padding:5}} className={'info-card'} >
                                        <Row align="middle" gutter={[24, 0]}>
                                            <Col xs={18}>
                                                <Title style={{margin:0 ,color:"#666"}} level={5}>{c.today}</Title>
                                                <Title style={{marginTop:8}} level={4}>
                                                    {c.title}
                                                </Title>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="icon-box" style={{background:"#12895f"}}>{c.icon}</div>
                                            </Col>
                                        </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Drawer>
            <div className="layout-content" >
                <Row>
                    <Col span={16}>
                        <Title level={4} style={{marginBottom: 12}}>
                            <FaLocationDot style={{fontSize:'16px'}}/>  {getByIdLedScreen?.address}
                        </Title>
                    </Col>
                    <Col span={8}>
                        <Button
                            type='primary'
                            icon={<PlusOutlined/>}
                            style={{width: '100%'}}
                            onClick={addArticle}>
                             Добавить
                        </Button>
                    </Col>
                    <Divider className={'home-divider'}/>
                </Row>
                <Space direction={"vertical"} style={{width:'100%'}} size={["large" , 'middle']}>

                    <Row gutter={[24, 24]} style={{marginBottom:20}} justify="center">
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                className={'my-card'}
                                rounded={false}
                                cover={
                                    <img
                                        style={{width: '100%', height: '300px', objectFit: 'cover' }}
                                        alt="Video"
                                        src={`${process.env.REACT_APP_API_URL}${getByIdLedScreen?.image?.path}`}
                                    />
                                }
                            >
                                <Button onClick={showDrawer} type="primary" size={"small"}
                                        style={{position: 'absolute', bottom: '10px', right: '10px',backgroundColor:'#009552',border:'0'}}>
                                    Параметры
                                </Button>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} md={8}>
                            <Card
                                className={'my-card'}
                                cover={
                                    <img
                                        style={{width: '100%', height: '300px', objectFit: 'cover'}}
                                        alt="online"
                                        src={`${process.env.REACT_APP_API_URL}${getByIdLedScreen?.locationImage?.path}`}
                                    />
                                }
                            >
                                {/*<Button onClick={showDrawerLocation} type="primary" size={"small"}*/}
                                {/*        style={{*/}
                                {/*            position: 'absolute',*/}
                                {/*            bottom: '10px',*/}
                                {/*            right: '10px',*/}
                                {/*            backgroundColor: '#009552'*/}
                                {/*        }}>*/}
                                {/*    Параметры*/}
                                {/*</Button>*/}
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                className={'my-card'}
                                cover={
                                    !isVideoPlaying ?
                                        <img src={'/Безымянный-012.jpg'} alt={'video image'} style={{width: '100%', height: '300px', objectFit: 'cover'}} onClick={()=>setIsVideoPlaying(true)}/>
                                        :
                                        <video
                                            autoPlay
                                            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', }}
                                            controls
                                        >
                                            <source
                                                src={`${process.env.REACT_APP_API_URL}${getByIdLedScreen?.video?.path}`}
                                                type="video/mp4"
                                            />
                                            Sizning brauzeringiz videoni qo‘llab-quvvatlamaydi.
                                        </video>
                                }
                            >
                            </Card>
                        </Col>
                    </Row>
                    {
                        getByIdLedScreenStatistics?.statistics  &&
                        <>
                            <Row gutter={[12, 4]}>
                                <Col span={24} style={{display: 'flex' , justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Title level={4}>
                                        Аналитические данные
                                    </Title>
                                    <Button onClick={togglePercentage}>
                                        {isPercentage ? "Показать обычные значения" : "Показать проценты"}
                                    </Button>
                                    <span style={{fontSize:14 , color:'#ccc'}}> {getByIdLedScreenStatistics?.statistics?.month}
                        </span>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={6}   >
                                    <Card bordered={false}  className="criclebox h-full criclebox-clip-path" style={{height:'100%',background:'#12895f', display:'flex', alignItems: 'center' , justifyContent:'start' }} >
                                        <div style={{display: 'flex',   gap:10, alignItems: 'center'}}>
                                            <Title level={2} style={{color:'white', marginBottom:0}}>OTS <sub style={{fontSize:12 , fontWeight:300}}>(в месяц)</sub></Title>
                                            <Tooltip
                                                key={2}
                                                title={
                                                    "OTS  Opportunity to see это показатель эффективной аудитории. Он показывает число людей, которые имели возможность увидеть"
                                                }
                                                placement="top"
                                            >
                                                <FaQuestion  style={{color:'#12895f' , borderRadius:'100%', fontSize:10 ,padding:1 ,background:'white' ,cursor:'pointer'}} />
                                            </Tooltip>
                                        </div>


                                        <Title level={3} style={{fontSize:20,marginTop:0, color:'white'}}>
                                            {getByIdLedScreenStatistics?.statistics?.allViews}

                                        </Title>
                                        <Title level={3} style={{fontSize:20,marginTop:0, color:'white'}}>
                                            Нв {getByIdLedScreenStatistics?.statistics?.nightVision}
                                        </Title>
                                    </Card>
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                                    <Card bordered={false} className="criclebox h-full" style={{height:'100%' }}>
                                        <RefererChart isPercentage={isPercentage} data={TimeViews} />
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                                    <Card bordered={false} className="criclebox h-full" style={{height:'100%' }} >
                                        <PieChart data={AgeViews} Title={'Возраст'} isPercentage={isPercentage} />
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                                    <Card bordered={false} className="criclebox h-full" style={{height:'100%' }}>
                                        <RefererChart isPercentage={isPercentage} data={PassengerViews} />
                                    </Card>
                                </Col>
                            </Row>
                            <Row gutter={[12, 4]}>
                                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Title level={4} style={{marginBottom:0}}>
                                        Охват аудитории
                                    </Title>
                                </Col>

                                <Col span={24}  xl={12}>
                                    <Card bordered={false} className="criclebox h-full" style={{ height: '100%' }}>
                                        <BarChart
                                            dataTime={workingDaysStatisticData?.labels || []}
                                            title={''}
                                            subTitle={`Рабочий дни / ${getByIdLedScreenStatistics?.statistics?.workingDayMonth} день`}
                                            isPercentage={isPercentage}
                                            barData={workingDaysStatisticData?.values || []}
                                        />

                                    </Card>
                                </Col>
                                <Col span={24}  xl={12}>
                                    <Card bordered={false} className="criclebox h-full" style={{ height: '100%' }}>
                                        <BarChart
                                            dataTime={offDaysStatisticData?.labels || []}
                                            isPercentage={isPercentage}
                                            subTitle={`Суббота, воскресение и дополнительные выходные дни / ${getByIdLedScreenStatistics?.statistics?.offDayMonth} день`}
                                            barData={offDaysStatisticData?.values || []}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                            <Row gutter={[12, 4]}>
                                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Title level={4} style={{marginBottom:0}}>
                                        Трансляции ролика IYB
                                    </Title>
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Card bordered={false} className="criclebox h-full" style={{height:'100%' }}>
                                        <RefererChart isPercentage={isPercentage} data={ViewsMonthSeconds}  />
                                    </Card>
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={9}>
                                    <Card bordered={false} className="criclebox h-full" style={{ height: '100%' }}>
                                        <BarChart
                                            dataTime={workingDaysStatisticInMyVideoData?.labels || []}
                                            isPercentage={isPercentage}
                                            title={''}
                                            subTitle={'Рабочий дни / 19 дней'}
                                            barData={workingDaysStatisticInMyVideoData?.values || []}
                                            footerText={`Все: ${getByIdLedScreenStatistics?.statistics?.allViewsWorkingDayMyVideo}`}
                                        />
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={9}>
                                    <Card bordered={false} className="criclebox h-full" style={{ height: '100%' }}>
                                        <BarChart
                                            isDaily={isDaily}
                                            dataTime={offDaysStatisticInMyVideoData.labels || []}
                                            isPercentage={isPercentage}
                                            subTitle={`Суббота, воскресение и дополнительные выходные дни
                                                ${getByIdLedScreenStatistics?.statistics?.offDayMonth} дней`}
                                            barData={offDaysStatisticInMyVideoData?.values || []}
                                            footerText={`Все: ${getByIdLedScreenStatistics?.statistics?.allViewsOffDayMyVideo}`}

                                        />
                                    </Card>
                                </Col>
                            </Row>
                            <Row gutter={[12, 8]}>
                                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Title level={4} style={{marginBottom:0}}>
                                        Оценка эффективности
                                    </Title>
                                </Col>
                                <Col span={24}>
                                    <Card style={{background:'#12895f'}}>
                                        <Space size={10} direction={"vertical"} style={{width:'100%'}}>
                                            <Text level={5} style={{color:'white' , display:'flex' ,justifyContent:'start' ,gap:2 , alignItems:'center'}}>
                                                Бюджет: <Title style={{marginBottom:0 ,color:'white'}} level={5}> {getByIdLedScreenStatistics?.statistics?.price}  </Title> сум / {getByIdLedScreenStatistics?.statistics?.month}
                                            </Text>
                                            <Text level={5} style={{color:'white' , display:'flex' ,justifyContent:'start' ,gap:2 , alignItems:'center'}}>

                                                OTS: <Title style={{marginBottom:0 ,color:'white'}} level={5}> {getByIdLedScreenStatistics?.statistics?.allViews}</Title>
                                            </Text>
                                            <Text level={5} style={{color:'white' , display:'flex' ,justifyContent:'start' ,gap:2 , alignItems:'center'}}>
                                                Время трансляции ролика на экране за декабрь
                                                <Title style={{marginBottom:0 ,color:'white'}} level={5}> {getByIdLedScreenStatistics?.statistics?.monthViewsSeconds}</Title> сек
                                            </Text>
                                            <Text level={5} style={{color:'white' , display:'flex' ,justifyContent:'start' ,gap:2 , alignItems:'center'}}>
                                                Доля просмотров ролика и IYB:
                                                <Title style={{marginBottom:0 ,color:'white'}} level={5}> {getByIdLedScreenStatistics?.statistics?.monthViewsMyVideo}</Title> чел
                                            </Text>

                                            <div style={{display:"flex" , justifyContent:'space-between'}}>
                                                <Text level={5} style={{color:'white' , display:'flex' ,justifyContent:'start' ,gap:2 , alignItems:'center'}}>
                                                    Сумма одного просмотра:
                                                    <Title style={{marginBottom:0 ,color:'white'}} level={5}> {getByIdLedScreenStatistics?.statistics?.oneViewsPrice}</Title> cум
                                                </Text>
                                                <Button>
                                                    <a href="../../public/Media-City-Analitic.pdf" download>
                                                        Cкачать
                                                    </a>
                                                </Button>
                                            </div>
                                        </Space>
                                    </Card>
                                </Col>

                            </Row>
                        </>
                    }
                </Space>

            </div>
        </>


    );
};

export default LedScreenInner;