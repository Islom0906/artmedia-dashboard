import {useEffect, useState} from "react";
import {Button, Card, Col, Form, Input, InputNumber, message, Row, Select, Typography, Upload} from "antd";
import { useLocation } from "react-router-dom";

import {
    useDeleteQuery,
    useEditQuery,
    useGetByIdQuery,
    usePostQuery,
} from "../../service/query/Queries";
import {
    EditGetById, onPreviewImage,
    SetInitialValue,
    SuccessCreateAndEdit,
} from "../../hooks";
import { AppLoader, FormInput } from "../../components";

const LedScreenPostEdit = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [fileListProps, setFileListProps] = useState([]);
    const editId = queryParams.get("editId");
    const selectID = queryParams.get("selectID");
    const toHour = queryParams.get("toHour");
    const fromHour = queryParams.get("fromHour");
    const [form] = Form.useForm();

    const fromHourNum = parseInt(fromHour, 10);
    const toHourNum = parseInt(toHour, 10);
    const checkFormat = (file) => {
        const isValidFormat = ['application/pdf'].includes(file.type);
        if (!isValidFormat) {
            message.error('Пожалуйста, загружайте только файлы в формате pdf.');
            return Upload.LIST_IGNORE;
        }
        return true;
    }
    const workingDayStatistics =
        !isNaN(fromHourNum) && !isNaN(toHourNum) && fromHourNum > toHourNum
            ? Array.from({ length: fromHourNum - toHourNum }, (_, index) => {
                const startHour = (7 + index).toString().padStart(2, "0");
                const endHour = ((7 + index + 1) % 24).toString().padStart(2, "0");
                return {
                    hour: `${startHour}:00 - ${endHour}:00`,
                    viewsNumber: null,
                };
            })
            : [];


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

    const initialValueForm = {
        young: null,
        middleAge: null,
        oldAge: null,
        nightVision: null,
        onFoot: null,
        bus: null,
        auto: null,
        bike: null,
        otherTransport: null,
        workingDayMonth: null,
        offDayMonth: null,
        workingDayStatistics: workingDayStatistics || [],
        dayOffStatistics: workingDayStatistics || [],
        monthViewsSeconds: null,
        price: null,
        locationId: null,
        month: "Январь",
        pdf:[]
    };
    const {mutate: imagesDeleteMutate} = useDeleteQuery()
    const {
        mutate: imagesUploadMutate,
        isSuccess: imagesUploadSuccess,
        isLoading: imagesUploadLoading,
        data: imagesUpload
    } = usePostQuery()
    const { mutate: postStatisticsMutate, isLoading: postStatisticsLoading } =
        usePostQuery();
    const {
        isLoading: editStatisticsLoading,
        data: editStatisticsData,
        refetch: editStatisticsRefetch,
        isSuccess: editStatisticsSuccess,
    } = useGetByIdQuery(false, "edit-statistics", editId, "/statistics");
    const { mutate: putStatistics, isLoading: putStatisticsLoading } = useEditQuery();
    SuccessCreateAndEdit(postStatisticsLoading, putStatisticsLoading, `/led-screen/${selectID}`);
    EditGetById(editStatisticsRefetch, editId);
    SetInitialValue(form, initialValueForm);
    useEffect(() => {
        if (imagesUploadSuccess) {
            const uploadImg = [{
                uid: imagesUpload[0]?._id,
                name: imagesUpload[0]?._id,
                status: "done",
                url: `${process.env.REACT_APP_API_URL}/${imagesUpload[0]?.path}`
            }]
            form.setFieldsValue({image: uploadImg});
            setFileListProps(uploadImg);
        }
    }, [imagesUpload]);


    useEffect(() => {
        if (editStatisticsSuccess) {
            const pdf = [{
                uid: editStatisticsData?.pdf?._id,
                name: editStatisticsData?.pdf?._id,
                status: "done",
                url:`${process.env.REACT_APP_API_URL}/${editStatisticsData.pdf?.path}`
            }];
            const edit = {
                image:pdf,
                young: editStatisticsData?.young,
                middleAge: editStatisticsData?.middleAge,
                oldAge: editStatisticsData?.oldAge,
                nightVision: editStatisticsData?.nightVision,
                onFoot: editStatisticsData?.onFoot,
                bus: editStatisticsData?.bus,
                auto: editStatisticsData?.auto,
                bike: editStatisticsData?.bike,
                otherTransport: editStatisticsData?.otherTransport,
                workingDayMonth: editStatisticsData?.workingDayMonth,
                offDayMonth: editStatisticsData?.offDayMonth,
                monthViewsSeconds: editStatisticsData?.monthViewsSeconds,
                price: editStatisticsData?.price,
                locationId: editStatisticsData?.locationId,
                month: editStatisticsData?.month,
                workingDayStatistics: editStatisticsData?.workingDayStatistics,
                dayOffStatistics:editStatisticsData?.dayOffStatistics
            };
            setFileListProps(pdf)
            console.log(edit)
            form.setFieldsValue(edit);
        }
    }, [editStatisticsData]);

    const onFinish = (value) => {
        const data = {
            young: value?.young,
            middleAge: value?.middleAge,
            oldAge: value?.oldAge,
            nightVision: value?.nightVision,
            onFoot: value?.onFoot,
            bus: value?.bus,
            auto: value?.auto,
            bike: value?.bike,
            pdf: fileListProps[0]?.uid,
            otherTransport: value?.otherTransport,
            workingDayMonth: value?.workingDayMonth,
            offDayMonth: value?.offDayMonth,
            monthViewsSeconds: value?.monthViewsSeconds,
            price: value?.price,
            locationId: selectID,
            workingDayStatistics: value?.workingDayStatistics,
            dayOffStatistics:value?.dayOffStatistics,
            month: value?.month,

        };

        if (editStatisticsData) {
            putStatistics({ url: `/statistics`, data: data, id: editId });
        } else {
            postStatisticsMutate({ url: `/statistics`, data: data });
        }
    };

    const onFailed = (value) => {
        console.log(value);
    };

    const onChangeImage = ({fileList: newFileList}) => {
        const formData = new FormData();
        if (fileListProps.length !== 0 || newFileList.length === 0) {
            form.setFieldsValue({image: []});
            const id = [fileListProps[0]?.uid];
            if (fileListProps[0]?.name) {
                imagesDeleteMutate({url: "/media", id});
            }
            setFileListProps([])
        } else if (newFileList.length !== 0) {
            formData.append("media", newFileList[0].originFileObj);
            imagesUploadMutate({url: "/media", data: formData});
        }
    };
    const { Title } = Typography;

    return (
        <div>
            {postStatisticsLoading || editStatisticsLoading || putStatisticsLoading ? (
                <AppLoader />
            ) : (
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: "100%" }}
                    initialValues={initialValueForm}
                    onFinish={onFinish}
                    onFinishFailed={onFailed}
                    autoComplete="off"
                >
                    <Row gutter={20}>
                        <Row gutter={[10 , 20]}>
                            <Col span={24}>
                                <Card size={"small"} title="возрастная диаграмма">
                                    <Row gutter={[8 ,10]}>
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите количество молодых"}
                                                label={"Молодые"}
                                                name={"young"}
                                                type="number"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите количество среднего возраста"}
                                                label={"Средний возраст"}
                                                name={"middleAge"}
                                                type="number"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите количество пожилых"}
                                                label={"Пожилые"}
                                                name={"oldAge"}
                                                type="number"
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card size={"small"} title="Диаграмма типа просмотрщика">

                                    <Row gutter={[8 ,10]} >
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите количество пассажиров автобуса"}
                                                label={"Автобус"}
                                                name={"bus"}
                                                type="number"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите количество автотранспорта"}
                                                label={"Авто"}
                                                name={"auto"}
                                                type="number"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите количество велосипедистов"}
                                                label={"Велосипед"}
                                                name={"bike"}
                                                type="number"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите количество других транспортных средств"}
                                                label={"Другой транспорт"}
                                                name={"otherTransport"}
                                                type="number"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите количество пеших"}
                                                label={"Пешие"}
                                                name={"onFoot"}
                                                type="number"
                                            />
                                        </Col>
                                    </Row>

                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card size={"small"} title="Количество просмотров в месяц">

                                    <Row gutter={[8 ,10]} >
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите количество рабочих дней в месяц"}
                                                label={"Рабочие дни в месяц"}
                                                name={"workingDayMonth"}
                                                type="number"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите количество выходных дней в месяц"}
                                                label={"Выходные дни в месяц"}
                                                name={"offDayMonth"}
                                                type="number"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label={'Выберите месяц'}
                                                name={'month'}
                                                rules={[{
                                                    required: true,
                                                    message: 'Выберите месяц'
                                                }]}
                                                wrapperCol={{
                                                    span: 24,
                                                }}
                                            >
                                                <Select
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    placeholder='Выберите месяц '
                                                    optionLabelProp='label'
                                                    options={selectMounth}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card size={"small"} title="Другие">

                                    <Row gutter={[8 ,10]} >
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите количество просмотров за месяц (секунды)"}
                                                label={"Просмотры за месяц (секунды)"}
                                                name={"monthViewsSeconds"}
                                                type="number"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите количество ночных посетителей"}
                                                label={"Ночные посетители"}
                                                name={"nightVision"}
                                                type="number"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <FormInput
                                                required={true}
                                                required_text={"Введите цену"}
                                                label={"Цена"}
                                                name={"price"}
                                                type="number"
                                            />
                                        </Col>
                                    </Row>

                                </Card>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label='PDF:'
                                    name={'image'}
                                    rules={[{required: true, message: ' PDF'}]}
                                >
                                    {/*<ImgCrop>*/}
                                    <Upload
                                        maxCount={1}
                                        fileList={fileListProps}
                                        listType='picture-card'
                                        onChange={onChangeImage}
                                        onPreview={onPreviewImage}
                                        beforeUpload={(file) => checkFormat(file)}
                                    >
                                        {fileListProps.length > 0 ? "" : "Upload"}
                                    </Upload>
                                    {/*</ImgCrop>*/}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Col span={24}>
                            <Title level={3}>
                                Охват аудитории
                            </Title>
                        </Col>
                        <Col span={12} >
                            <Card  size={"small"} >
                                <Title level={5} style={{marginTop: '10px' , marginBottom:'20px'}}>
                                    для рабочих дней
                                </Title>
                                <Form.List name="workingDayStatistics">
                                    {(fields) =>
                                        fields.map((field, index) => (
                                            <div key={field.key}>
                                                <Row gutter={10}>
                                                    <Col span={8}>
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, "hour"]}
                                                            fieldKey={[field.fieldKey, "hour"]}
                                                        >
                                                            <Input disabled />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={16}>
                                                        <Form.Item
                                                            style={{width:'100%'}}
                                                            {...field}
                                                            name={[field.name, "viewsNumber"]}
                                                            fieldKey={[field.fieldKey, "viewsNumber"]}
                                                        >
                                                            <InputNumber style={{width:'100%'}} min={0} placeholder="Количество зрителей в час (1 день)" />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))
                                    }
                                </Form.List>
                            </Card>
                        </Col>
                        <Col span={12} >
                            <Card size={"small"} >
                                <Title level={5} style={{marginTop: '10px' , marginBottom:'20px'}}>
                                    на субботу, воскресенье и другие праздники
                                </Title>
                                <Form.List name="dayOffStatistics">
                                    {(fields) =>
                                        fields.map((field, index) => (
                                            <div key={field.key}>
                                                <Row gutter={10}>
                                                    <Col span={8}>
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, "hour"]}
                                                            fieldKey={[field.fieldKey, "hour"]}
                                                        >
                                                            <Input disabled />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={16}>
                                                        <Form.Item
                                                            style={{width:'100%'}}
                                                            {...field}
                                                            name={[field.name, "viewsNumber"]}
                                                            fieldKey={[field.fieldKey, "viewsNumber"]}
                                                        >
                                                            <InputNumber style={{width:'100%'}} min={0} placeholder="Количество зрителей в час (1 день)" />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))
                                    }
                                </Form.List>
                            </Card>
                        </Col>
                    </Row>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%", marginTop: "20px" }}
                    >
                        {editStatisticsSuccess ? "Редактировать" : "Создать"}
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default LedScreenPostEdit;
