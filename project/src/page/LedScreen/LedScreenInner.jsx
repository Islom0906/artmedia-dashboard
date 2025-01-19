import React, {useEffect, useMemo, useState} from "react";
import {Row, Col, Typography, Button, Card, Drawer, Space, Tooltip, Divider, Select} from "antd";
// import './HomeApp.css'
import {FieldTimeOutlined, PlusOutlined} from "@ant-design/icons";
import {BsArrowsFullscreen, BsPercent} from "react-icons/bs";
import {MdOutlineScreenshotMonitor} from "react-icons/md";
import {IoMdTime} from "react-icons/io";
import {RiFileExcel2Fill, RiPassPendingLine} from "react-icons/ri";
import {FaFilePdf, FaQuestion} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {BarChart, PieChart, RefererChart} from "../../components";
import {useNavigate, useParams} from "react-router-dom";
import {useGetByIdQuery} from "../../service/query/Queries";
import {GoNumber} from "react-icons/go";
import {CiCalendarDate} from "react-icons/ci";
import {IoCalendarNumberOutline} from "react-icons/io5";

const { Title , Text } = Typography;





const LedScreenInner = () => {
    const [visible, setVisible] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [isPercentage, setIsPercentage] = useState(false);
    const [isDaily , setIsDaily] = useState(false);
    const togglePercentage = () => setIsPercentage((prev) => !prev);
    const toggleIsDaily = () => setIsDaily((prev) => !prev);
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
        if (getByIdLedScreenStatistics?.statistics?._id){
        navigate(`/led-screen/statistics-add?editId=${getByIdLedScreenStatistics?.statistics?._id}&selectID=${getByIdLedScreen?._id}&toHour=${getByIdLedScreen?.toHour}&fromHour=${getByIdLedScreen?.fromHour}`);
        }else{
            navigate(`/led-screen/statistics-add?toHour=${getByIdLedScreen?.toHour}&fromHour=${getByIdLedScreen?.fromHour}&selectID=${getByIdLedScreen?._id}`)
        }

    };
    console.log(getByIdLedScreenStatistics?.statistics?._id)
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

    console.log(isDaily)




    const TimeViews = useMemo(() =>{
        const a= getByIdLedScreenStatistics?.statistics?.timeViews

        const  dataTimeViews= [
            { value:isPercentage ? a?.workingDayPercent : a?.workingDay, name: 'Рабочий дни' },
            { value:isPercentage ? a?.offDayPercent: a?.offDay, name: 'Выходные дни' },
            { value:isPercentage ? a?.nightVisionPercent: a?.nightVision, name: 'Ночное время' },
        ]

        return dataTimeViews
    } , [getByIdLedScreenStatistics ,isPercentage])
    const AgeViews = useMemo(() =>{

        const a =getByIdLedScreenStatistics?.statistics?.age

        const  dataAgeViews= [
            { value: isPercentage ? a?.youngPercent : a?.young  , name: '0-16 ' },
            { value: isPercentage ? a?.middleAgePercent : a?.middleAge , name: '17-60 ' },
            { value: isPercentage ?  a?.oldAgePercent :a?.oldAge, name: '61-100 ' },
        ]
        return dataAgeViews
    } , [getByIdLedScreenStatistics ,isPercentage])
    const PassengerViews = useMemo(() =>{
        const a = getByIdLedScreenStatistics?.statistics?.passenger

        const  dataPassengerViews= [
            { value: isPercentage ? a?.autoPercent : a?.auto, name: 'Авто' },
            { value: isPercentage ? a?.busPercent : a?.bus, name: 'Автобус' },
            { value: isPercentage ? a?.onFootPercent : a?.onFoot, name: 'Пеший' },
            { value: isPercentage ? a?.bikePercent : a?.bike, name: 'Велосипед' },
            { value: isPercentage ? a?.otherTransportPercent : a?.otherTransport, name: 'И другие виды транспорта' },
        ]
        return dataPassengerViews
    } , [getByIdLedScreenStatistics ,isPercentage ])


    const ViewsMonthSeconds = useMemo(() =>{

        const a =getByIdLedScreenStatistics?.statistics?.viewsMonthSeconds

        const  dataViewsMonthSeconds= [
                { value: isPercentage ? a?.viewSecondsPercent : a?.viewSeconds, name: 'Ролик IYB' },
                { value: isPercentage ? a?.otherSecondsPercent : a?.otherSeconds, name: 'Другие ролики' },
        ]
        return dataViewsMonthSeconds
    } , [getByIdLedScreenStatistics , isPercentage ])



    const offDaysStatisticData = useMemo( () => {
        const a= getByIdLedScreenStatistics?.statistics?.offDaysStatistic

        return {
            labels: a?.map(item => item?.hour),
            values:  isPercentage ? a?.map(item => item?.viewsNumberMonthPercent) :  a?.map(item => item?.viewsNumberMonth),
            valuesDaily: a?.map(item => item?.viewsNumberDay)
        };
    } , [getByIdLedScreenStatistics ,isPercentage , isDaily])
    const workingDaysStatisticData = useMemo( () => {
        const a= getByIdLedScreenStatistics?.statistics?.workingDaysStatistic
        return {
            labels: a?.map(item => item?.hour),
            values:  isPercentage ? a?.map(item => item?.viewsNumberMonthPercent) : a?.map(item => item?.viewsNumberMonth),
            valuesDaily: a?.map(item => item?.viewsNumberDay)

        };
    } , [getByIdLedScreenStatistics ,isPercentage ,isDaily])
    const offDaysStatisticInMyVideoData = useMemo( () => {
        const a= getByIdLedScreenStatistics?.statistics?.offDaysStatisticInMyVideo
        return {
            labels: a?.map(item => item?.hour),
            values:  isPercentage ? a?.map(item => item?.viewsNumberMonthMyVideoPercent) : a?.map(item => item?.viewsNumberMonthMyVideo),
            valuesDaily: a?.map(item => item?.viewsNumberDayMyVideo)
        };
    } , [getByIdLedScreenStatistics ,isPercentage , isDaily])
    const workingDaysStatisticInMyVideoData = useMemo( () => {

        const a = getByIdLedScreenStatistics?.statistics?.workingDaysStatisticInMyVideo
        return {
            labels: a?.map(item => item?.hour),
            values:  isPercentage ? a?.map(item => item?.viewsNumberMonthMyVideoPercent) :  a?.map(item => item?.viewsNumberMonthMyVideo),
            valuesDaily: a?.map(item => item?.viewsNumberDayMyVideo)
        };
    } , [getByIdLedScreenStatistics ,isPercentage , isDaily])



    const selectMounth = [
        { label: 'Январь', value: 'Январь' },
        { label: 'Февраль', value: 'Февраль' },
        { label: 'Март', value: 'Март' },
        { label: 'Апрель', value: 'Апрель' },
        { label: 'Май', value: 'Май' },
        { label: 'Июнь', value: 'Июнь' },
        { label: 'Июль', value: 'Июль' },
        { label: 'Август', value: 'Август' },
        { label: 'Сентябрь', value: 'Сентябрь' },
        { label: 'Октябрь', value: 'Октябрь' },
        { label: 'Ноябрь', value: 'Ноябрь' },
        { label: 'Декабрь', value: 'Декабрь' }
    ];

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
                        <Title level={4} style={{marginTop: 0}}>
                            <FaLocationDot style={{fontSize:'16px'}}/>  {getByIdLedScreen?.address}
                        </Title>
                    </Col>
                    <Col span={8}>
                        <Button
                            type='primary'
                            icon={<PlusOutlined/>}
                            style={{width: '100%'}}
                            onClick={addArticle}>
                            Статистика
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
                                <Button onClick={showDrawer} type="primary"
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
                                    <Row style={{width:'100%'}} gutter={[12, 4]}>
                                        <Col span={16}>
                                            <Title level={4} style={{marginTop:0}}>
                                                Аналитические данные
                                            </Title>
                                        </Col>
                                        <Col span={8} style={{display:"flex" , alignItems:"center" ,gap:8}}>
                                            <Button onClick={toggleIsDaily} type={"primary"}>
                                                {isDaily ? <CiCalendarDate  style={{fontSize:24}} /> : <IoCalendarNumberOutline  style={{fontSize:24}} />}
                                            </Button>
                                            <Button onClick={togglePercentage} type={"primary"}>
                                                {isPercentage ? <GoNumber style={{fontSize:24}} /> : <BsPercent style={{fontSize:24}} />}
                                            </Button>

                                            <Select
                                                style={{
                                                    width: '100%',
                                                }}
                                                defaultValue={getByIdLedScreenStatistics?.statistics?.month}
                                                disabled={true}
                                                placeholder='Выберите месяц '
                                                optionLabelProp='label'
                                                options={selectMounth}
                                            />
                                        </Col>
                                    </Row>
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
                                            isDailyBarData={workingDaysStatisticData?.valuesDaily || []}
                                        />

                                    </Card>
                                </Col>
                                <Col span={24}  xl={12}>
                                    <Card bordered={false} className="criclebox h-full" style={{ height: '100%' }}>
                                        <BarChart
                                            dataTime={offDaysStatisticData?.labels || []}
                                            isPercentage={isPercentage}
                                            isDaily={isDaily}
                                            subTitle={`Суббота, воскресение и дополнительные выходные дни / ${getByIdLedScreenStatistics?.statistics?.offDayMonth} день`}
                                            barData={offDaysStatisticData?.values || []}
                                            isDailyBarData={offDaysStatisticData?.valuesDaily || []}
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
                                            isDaily={isDaily}
                                            subTitle={`Рабочий дни / ${getByIdLedScreenStatistics?.statistics?.workingDayMonth} дней`}
                                            barData={workingDaysStatisticInMyVideoData?.values || []}
                                            isDailyBarData={workingDaysStatisticInMyVideoData?.valuesDaily || []}
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
                                            isDailyBarData={offDaysStatisticInMyVideoData?.valuesDaily || []}
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
                                            <Space size={5}>
                                                <Text style={{color:"white"}}>
                                                    Бюджет:
                                                </Text>
                                                <Title style={{marginBottom:0  , marginTop:0 ,color:'white'}} level={5}> {getByIdLedScreenStatistics?.statistics?.price}
                                                </Title>
                                                <Text style={{color:"white"}}>
                                                    сум /
                                                    {getByIdLedScreenStatistics?.statistics?.month}
                                                </Text>
                                            </Space>
                                            <Space size={5}>
                                                <Text style={{color:"white"}}>
                                                    OTS:
                                                </Text>
                                                <Title style={{marginBottom:0  , marginTop:0 ,color:'white'}} level={5}> {getByIdLedScreenStatistics?.statistics?.allViews}
                                                </Title>
                                            </Space>
                                            <Space size={5}>
                                                <Text style={{color:"white"}}>
                                                    Время трансляции ролика на экране за декабрь:
                                                </Text>
                                                <Title style={{marginBottom:0  , marginTop:0 ,color:'white'}} level={5}> {getByIdLedScreenStatistics?.statistics?.monthViewsSeconds}
                                                </Title>
                                                <Text style={{color:"white"}}>
                                                    сек
                                                </Text>
                                            </Space>
                                            <Space size={5}>
                                                <Text style={{color:"white"}}>
                                                    Доля просмотров ролика и IYB:
                                                </Text>
                                                <Title style={{marginBottom:0  , marginTop:0 ,color:'white'}} level={5}> {getByIdLedScreenStatistics?.statistics?.monthViewsMyVideo}
                                                </Title>
                                                <Text style={{color:"white"}}>
                                                    чел
                                                </Text>
                                            </Space>


                                            <div style={{display:"flex" , justifyContent:'space-between'}}>
                                                <Space size={5}>
                                                    <Text style={{color:"white"}}>
                                                        Сумма одного просмотра:
                                                    </Text>
                                                    <Title style={{marginBottom:0  , marginTop:0 ,color:'white'}} level={5}>{getByIdLedScreenStatistics?.statistics?.oneViewsPrice}
                                                    </Title>
                                                    <Text style={{color:"white"}}>
                                                        cум
                                                    </Text>
                                                </Space>
                                                <Space size={"small"} direction={"vertical"} >
                                                    <Text style={{color:"white"}}>
                                                        Cкачать
                                                    </Text>
                                                    <Space size={"small"} direction={"horizontal"}> <Button type={"primary"}>
                                                        <a href={`${process.env.REACT_APP_API_URL}/${getByIdLedScreenStatistics?.statistics?.pdf}`} download>
                                                            <FaFilePdf  />
                                                        </a>

                                                    </Button >
                                                        <Button type={"primary"} disabled={true}>
                                                                <RiFileExcel2Fill style={{color:"white"}} />
                                                        </Button>
                                                    </Space>

                                                </Space>

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