import React, {useState} from "react";
import {Row, Col, Typography, Button, Card, Drawer, Space,Tooltip,Divider} from "antd";
// import './HomeApp.css'
import {FieldTimeOutlined} from "@ant-design/icons";
import {BsArrowsFullscreen} from "react-icons/bs";
import {MdOutlineScreenshotMonitor} from "react-icons/md";
import {IoMdTime} from "react-icons/io";
import {RiPassPendingLine} from "react-icons/ri";
import {FaQuestion} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {BarChart, PieChart, RefererChart} from "../../components";

const { Title , Text } = Typography;



const count = [
    {
        today: "Pixel экрана",
        title: "1800 x 700 ",
        icon: <MdOutlineScreenshotMonitor style={{fontSize:24}} />,
    },
    {
        today: "Размер экрана",
        title: "18 x 7 M",
        icon: < BsArrowsFullscreen style={{fontSize:24}} />,
    },
    {
        today: " Bремя трансляции (в день)",
        title: "7:00 - 23:00",
        icon: <IoMdTime style={{fontSize:24}} />,
    },
    {
        today: " Паспорт объекта",
        title: "2793",
        icon: <RiPassPendingLine style={{fontSize:24}}  />,
    },
];

const LedScreen = () => {
    const [visible, setVisible] = useState(false);
    const [visibleLocation, setVisibleLocation] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)

    const showDrawer = () => setVisible(true);
    const hideDrawer = () => setVisible(false);
    const hideDrawerLocation = () => setVisibleLocation(false);
    const showDrawerLocation = () => setVisibleLocation(true);
    const  dataRefererChart1= [
        { value: 2013077, name: 'Рабочий дни' },
        { value: 856120, name: 'Выходные дни' },
        { value: 544617, name: 'Ночное время' },
    ]
    const  dataRefererChart5= [
        { value: 7440, name: 'Ролик IYB' },
        { value: 169000, name: 'Другие ролики' },
    ]
    const  dataRefererChart2= [
        { value: 30, name: 'Авто' },
        { value: 10, name: 'Автобус' },
        { value: 50, name: 'Пеший' },
        { value: 5, name: 'Велосипед' },
        { value: 5, name: 'И другие виды транспорта' },
    ]
    const  dataPieChart= [
        { value: 573839, name: '0-16 ' },
        { value: 2008438, name: '17-60 ' },
        { value: 286920, name: '61-100 ' },
    ]
    const dataTime = [
        "07:00 – 08:00", "08:00 – 09:00",
        "09:00 – 10:00", "10:00 – 11:00",
        "11:00 – 12:00", "12:00 – 13:00",
        "13:00 – 14:00", "14:00 – 15:00",
        "15:00 – 16:00", "16:00 – 17:00",
        "17:00 – 18:00", "18:00 – 19:00",
        "19:00 – 20:00", "20:00 – 21:00",
        "21:00 – 22:00", "22:00 – 23:00"
    ];


    return (

        <>
            <Drawer
                className="settings-drawer"
                mask={true}
                width={360}
                onClose={hideDrawer}
                visible={visible}
                placement={'right'}
            >
                <div layout="vertical">
                    <div className="header-top">
                        <Title level={4}>
                            Информация
                        </Title>
                    </div>
                    <Row className="rowgap-vbox" gutter={[24, 0]}>
                        {count.map((c, index) => (
                            <Col
                                key={index}
                                span={24}
                                className="mb-24"
                            >
                                <Card bordered={false} className="criclebox ">
                                    <div className="number">
                                        <Row align="middle" gutter={[24, 0]}>
                                            <Col xs={18}>
                                                <span>{c.today}</span>
                                                <Title level={4}>
                                                    {c.title} <small className={c.bnb}>{c.persent}</small>
                                                </Title>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="icon-box" style={{background:"#12895f"}}>{c.icon}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>


                </div>
            </Drawer>
            <Drawer
                className="settings-drawer"
                mask={true}
                width={360}
                onClose={hideDrawerLocation}
                visible={visibleLocation}
                placement={'right'}
            >
                <div layout="vertical">
                    <div className="header-top">
                        <Title level={4}>
                            Адрес
                        </Title>
                    </div>
                    <Space direction="vertical" size={10}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.31094043489!2d69.2821431758764!3d41.34559477130517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b021d0567c7%3A0xe4fb491f60e7b456!2sTeleminora%20Toshkent.!5e0!3m2!1sru!2s!4v1736672172402!5m2!1sru!2s"
                            style={{width: "100%", height: "250px", border: "none"}} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <Text>
                            г.Ташкент, Чиланзарский район,
                            Пересечение ул.И.Каримова и ул.Фуркада. (перекресток)
                        </Text>
                    </Space>

                </div>
            </Drawer>
            <div className="layout-content" >
                <Row>
                    <Col xs={24} sm={24} md={20}  lg={20}>
                        <Title level={4} style={{marginBottom: 12}}>
                            <FaLocationDot style={{fontSize:'16px'}}/>  г.Ташкент, Чиланзарский район,
                            Пересечение ул.И.Каримова и ул.Фуркада. (перекресток)
                        </Title>
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
                                        alt="online"
                                        src="/Безымянный-3.jpg"
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
                                        src="/Безымянный-001.jpg"
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
                                                src="/IMG_3593.mp4"
                                                type="video/mp4"
                                            />
                                            Sizning brauzeringiz videoni qo‘llab-quvvatlamaydi.
                                        </video>
                                }
                            >
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[12, 4]}>
                        <Col span={24} style={{display: 'flex' , justifyContent: 'space-between', alignItems: 'center'}}>
                            <Title level={4}>
                                Аналитические данные
                            </Title>
                            <span style={{fontSize:14 , color:'#ccc'}}> за период

                        01.12.2024 - 31.12.2024 г.
                        </span>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6}   >
                            <Card bordered={false}  className="criclebox h-full" style={{height:'100%',background:'#12895f', display:'flex', alignItems: 'center' , justifyContent:'center' }} >
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


                                <Title level={3} style={{fontSize:12, color:'white'}}>
                                    2 869 197

                                </Title>
                                <Title level={3} style={{fontSize:12, color:'white'}}>
                                    Нв 544 617
                                </Title>
                            </Card>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                            <Card bordered={false} className="criclebox h-full" style={{height:'100%' }}>
                                <RefererChart data={dataRefererChart1} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                            <Card bordered={false} className="criclebox h-full" style={{height:'100%' }} >
                                <PieChart data={dataPieChart} Title={'Возраст'} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                            <Card bordered={false} className="criclebox h-full" style={{height:'100%' }}>
                                <RefererChart data={dataRefererChart2} />
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
                                    dataTime={dataTime}
                                    title={''}
                                    subTitle={'Рабочий дни / 19 день'}
                                    barData={[
                                        110246, 210883, 130367, 45817, 53493, 170628,
                                        190768, 170628, 47831, 59915, 110246, 311551,
                                        251150, 69985, 49845, 29724
                                    ]}
                                />
                            </Card>
                        </Col>
                        <Col span={24}  xl={12}>
                            <Card bordered={false} className="criclebox h-full" style={{ height: '100%' }}>
                                <BarChart
                                    dataTime={dataTime}
                                    title={''}
                                    subTitle={'Суббота, воскресение и дополнительные выходные дни / 12 день'}
                                    barData={[8558, 17126, 25682, 42806, 68486 , 68486, 51374, 42806, 77054, 68486, 85610, 94178, 102733, 42805, 34249, 25681]}
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
                                <RefererChart data={dataRefererChart5} />
                            </Card>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={9}>
                            <Card bordered={false} className="criclebox h-full" style={{ height: '100%' }}>
                                <BarChart
                                    dataTime={dataTime}
                                    title={''}
                                    subTitle={'Рабочий дни / 19 дней'}
                                    barData={[4630, 8857, 5475, 1924, 2247, 7166, 8012, 7166, 2009, 2516, 4630, 13085, 10548, 2939, 2093 , 1248]}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={9}>
                            <Card bordered={false} className="criclebox h-full" style={{ height: '100%' }}>
                                <BarChart
                                    dataTime={dataTime}
                                    title={''}
                                    subTitle={'Суббота, воскресение и дополнительные выходные дни\n\n' +
                                        '12 дней'}
                                    barData={[360, 719, 1079, 1798, 2877, 2877, 2157, 1798, 3236, 2877, 3596, 3955, 4315, 1798, 1438, 1079]}
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
                                        Бюджет: <Title style={{marginBottom:0 ,color:'white'}} level={5}> 29 000 000  </Title> сум / за декабрь 2024г
                                    </Text>
                                    <Text level={5} style={{color:'white' , display:'flex' ,justifyContent:'start' ,gap:2 , alignItems:'center'}}>

                                        OTS / за период: <Title style={{marginBottom:0 ,color:'white'}} level={5}> 2 869 197</Title> сум
                                    </Text>
                                    <Text level={5} style={{color:'white' , display:'flex' ,justifyContent:'start' ,gap:2 , alignItems:'center'}}>
                                        Время трансляции ролика на экране за декабрь
                                        <Title style={{marginBottom:0 ,color:'white'}} level={5}> 7 440</Title> сек
                                    </Text>
                                    <Text level={5} style={{color:'white' , display:'flex' ,justifyContent:'start' ,gap:2 , alignItems:'center'}}>
                                        Доля просмотров ролика и IYB:
                                        <Title style={{marginBottom:0 ,color:'white'}} level={5}> 120 504</Title> чел
                                    </Text>

                                    <div style={{display:"flex" , justifyContent:'space-between'}}>
                                        <Text level={5} style={{color:'white' , display:'flex' ,justifyContent:'start' ,gap:2 , alignItems:'center'}}>
                                            Сумма одного просмотра:
                                            <Title style={{marginBottom:0 ,color:'white'}} level={5}> 241</Title> cум
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
                </Space>

            </div>
        </>


    );
};

export default LedScreen;