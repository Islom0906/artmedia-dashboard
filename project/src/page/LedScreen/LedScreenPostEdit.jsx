import  {useEffect,  useState} from 'react';
import {Button, Col,  Form, message, Row, Select, TimePicker, Upload} from "antd";
import {useLocation} from "react-router-dom";
import dayjs from "dayjs";
import {useDeleteQuery, useEditQuery, useGetByIdQuery, usePostQuery} from "../../service/query/Queries";
import {EditGetById, SetInitialValue, SuccessCreateAndEdit , onPreviewImage} from "../../hooks";
import {AppLoader, FormInput} from "../../components";


const initialValueForm ={
    address: "",
    image: [],
    locationImage: [],
    video: [],
    screenPixel: "",
    fromHour: "",
    toHour: "",
    passportID:"",
    screenSize:""
}


const LedScreenPostEdit = () => {
    const location = useLocation();
    const [fileListProps, setFileListProps] = useState([]);
    const [fileListPropsLocationImage, setFileListPropsLocationImage] = useState([]);
    const [fileListPropsVideo, setFileListPropsVideo] = useState([]);
    const queryParams = new URLSearchParams(location.search);
    const editId = queryParams.get('editId');
    const [form] = Form.useForm();

    const {mutate: imagesDeleteMutate} = useDeleteQuery()
    const {
        mutate: imagesUploadMutate,
        isSuccess: imagesUploadSuccess,
        isLoading: imagesUploadLoading,
        data: imagesUpload
    } = usePostQuery()
    const {
        mutate: imagesUploadLocationImageMutate,
        isSuccess: imagesUploadLocationImageSuccess,
        isLoading: imagesUploadLocationImageLoading,
        data: imagesUploadLocationImage
    } = usePostQuery()
    const {
        mutate: imagesUploadVideoMutate,
        isSuccess: imagesUploadVideoSuccess,
        isLoading: imagesUploadVideoLoading,
        data: imagesUploadVideo
    } = usePostQuery()
    const {
        mutate: postLocationMutate,
        isLoading: postLocationLoading,
        isSuccess: postLocationSuccess
    } = usePostQuery()
    const {
        isLoading: editLocationLoading,
        data: editLocationData,
        refetch: editLocationRefetch,
        isSuccess: editLocationSuccess
    } = useGetByIdQuery(false, "edit-location", editId, '/location')
    const {
        mutate: putLocation,
        isLoading: putLocationLoading,
        isSuccess: putLocationSuccess
    } = useEditQuery()
    SuccessCreateAndEdit(postLocationSuccess,putLocationSuccess,'/dashboard')
    EditGetById(editLocationRefetch,editId)
    SetInitialValue(form,initialValueForm)

    const regionsOfUzbekistan = [
        { label: 'Андижанская область', value: 'Андижанская область' },
        { label: 'Бухарская область', value: 'Бухарская область' },
        { label: 'Джизакская область', value: 'Джизакская область' },
        { label: 'Кашкадарьинская область', value: 'Кашкадарьинская область' },
        { label: 'Навоийская область', value: 'Навоийская область' },
        { label: 'Наманганская область', value: 'Наманганская область' },
        { label: 'Самаркандская область', value: 'Самаркандская область' },
        { label: 'Сурхандарьинская область', value: 'Сурхандарьинская область' },
        { label: 'Сырдарьинская область', value: 'Сырдарьинская область' },
        { label: 'Ташкентская область', value: 'Ташкентская область' },
        { label: 'Ташкент', value: 'Ташкент' },
        { label: 'Ферганская область', value: 'Ферганская область' },
        { label: 'Хорезмская область', value: 'Хорезмская область' },
        { label: 'Республика Каракалпакстан', value: 'Республика Каракалпакстан' }
    ];

    useEffect(() => {
        if (editLocationSuccess) {
            const image = [{
                uid: editLocationData?.image?._id,
                name: editLocationData?.image?._id,
                status: "done",
                url:`${process.env.REACT_APP_API_URL}/${editLocationData.image?.path}`
            }];
            const locationImage = [{
                uid: editLocationData?.locationImage?._id,
                name: editLocationData?.locationImage?._id,
                status: "done",
                url:`${process.env.REACT_APP_API_URL}/${editLocationData.locationImage?.path}`
            }];
            const video = [{
                uid: editLocationData?.video?._id,
                name: editLocationData?.video?._id,
                status: "done",
                url:`${process.env.REACT_APP_API_URL}/${editLocationData.video?.path}`
            }];

            const edit = {
                image,locationImage , video,
                address: editLocationData?.address,
                passportID: editLocationData?.passportID,
                screenPixel: editLocationData?.screenPixel,
                fromHour: dayjs(editLocationData?.fromHour , "HH:mm"),
                toHour: dayjs(editLocationData?.toHour , "HH:mm"),
                region: editLocationData?.region,
                screenSize: editLocationData?.screenSize,
            }

            setFileListProps(image)
            setFileListPropsLocationImage(locationImage)
            setFileListPropsVideo(video)
            form.setFieldsValue(edit)
        }
    }, [editLocationData])

    const onFinish = (value) => {
        const data = {
            address: value.address,
            passportID: value.passportID,
            image: fileListProps[0]?.uid,
            locationImage:fileListPropsLocationImage[0]?.uid,
            video: fileListPropsVideo[0]?.uid,
            screenPixel: value.screenPixel,
            fromHour: dayjs(value.fromHour).format("HH:mm"),
            toHour: dayjs(value.toHour).format("HH:mm"),
            region: value?.region,
            screenSize: value?.screenSize,
        }
        if (editLocationData) {
            putLocation({url: `/location`, data: data, id: editId})
        } else {
            postLocationMutate({url: `/location`, data: data});
        }
    }
    const onFailed = (value) => {
        console.log(value)
    }
    useEffect(() => {
        const storedValues = JSON.parse(localStorage.getItem('myFormValues'));
        if (storedValues) {
            // storedValues.image = []
            const data = {
                ...storedValues,
                image: 'editDataId',
            }
            form.setFieldsValue(data);
        }

        return () => {
            localStorage.removeItem('editDataId')
            // localStorage.removeItem('myFormValues')
        }
    }, []);

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
        if (imagesUploadLocationImageSuccess) {
            const uploadImg = [{
                uid: imagesUploadLocationImage[0]?._id,
                name: imagesUploadLocationImage[0]?._id,
                status: "done",
                url: `${process.env.REACT_APP_API_URL}/${imagesUploadLocationImage[0]?.path}`
            }]
            form.setFieldsValue({image: uploadImg});
            setFileListPropsLocationImage(uploadImg);
        }
    }, [imagesUploadLocationImage]);

    useEffect(() => {
        if (imagesUploadVideoSuccess) {
            const uploadImg = [{
                uid: imagesUploadVideo[0]?._id,
                name: imagesUploadVideo[0]?._id,
                status: "done",
                url: `${process.env.REACT_APP_API_URL}/${imagesUploadVideo[0]?.path}`
            }]
            form.setFieldsValue({image: uploadImg});
            setFileListPropsVideo(uploadImg);
        }
    }, [imagesUploadVideo]);

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
    const onChangeLocationImage = ({fileList: newFileList}) => {
        const formData = new FormData();
        if (fileListPropsLocationImage.length !== 0 || newFileList.length === 0) {
            form.setFieldsValue({image: []});
            const id = {
                ids: [fileListPropsLocationImage[0]?.uid]
            };
            imagesDeleteMutate({url: "/media", id});
            setFileListPropsLocationImage([])
        } else if (newFileList.length !== 0) {
            // formData.append("media", newFileList[0].originFileObj);
            formData.append("media", newFileList[0].originFileObj);
            imagesUploadLocationImageMutate({url: "/media", data: formData});
        }

    };

    const onChangeImageVideo = ({fileList: newFileList}) => {
        const formData = new FormData();
        if (fileListPropsVideo.length !== 0 || newFileList.length === 0) {
            form.setFieldsValue({video: []});
            const id = {
                ids: [fileListPropsVideo[0]?.uid]
            };
            imagesDeleteMutate({url: "/media", id});
            setFileListPropsVideo([])
        } else if (newFileList.length !== 0) {
            formData.append("media", newFileList[0].originFileObj);
            imagesUploadVideoMutate({url: "/media", data: formData});
        }

    };


    const checkFormat = (file) => {
        const isValidFormat = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'application/pdf'].includes(file.type);
        if (!isValidFormat) {
            message.error('Пожалуйста, загружайте только файлы в формате jpg, jpeg, png или mp4.');
            return Upload.LIST_IGNORE;
        }
        return true;
    }

    return (
        <div>
            {(postLocationLoading || editLocationLoading || putLocationLoading) ?
                <AppLoader/> :
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 24
                    }}
                    wrapperCol={{
                        span: 24
                    }}
                    style={{
                        maxWidth: "100%"
                    }}
                    initialValues={initialValueForm}
                    onFinish={onFinish}
                    onFinishFailed={onFailed}
                    autoComplete="off"
                >
                    <Row gutter={20}>
                        <Col span={24}>
                            <FormInput
                                required={true}
                                required_text={' название адрес'}
                                label={' адрес'}
                                name={'address'}
                            />
                        </Col>
                        <Col span={12}>
                            <FormInput
                                required={true}
                                required_text={' название паспорт удостоверение личности'}
                                label={' паспорт удостоверение личности'}
                                name={'passportID'}
                            />
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={'Выберите регионы'}
                                name={'region'}
                                rules={[{
                                    required: true,
                                    message: 'Выберите регионы'
                                }]}
                                wrapperCol={{
                                    span: 24,
                                }}
                            >
                                <Select
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder='Выберите регионы '
                                    optionLabelProp='label'
                                    options={regionsOfUzbekistan}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label='Картина:'
                                name={'image'}
                                // rules={[{required: true, message: ' Картина'}]}
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
                        <Col span={8}>
                            <Form.Item
                                label='Фото места:'
                                name={'locationImage'}
                                // rules={[{required: true, message: ' Фото места'}]}
                            >
                                {/*<ImgCrop>*/}
                                <Upload
                                    maxCount={1}
                                    fileList={fileListPropsLocationImage}
                                    listType='picture-card'
                                    onChange={onChangeLocationImage}
                                    onPreview={onPreviewImage}
                                    beforeUpload={(file) => checkFormat(file)}
                                >
                                    {fileListPropsLocationImage.length > 0 ? "" : "Upload"}
                                </Upload>
                                {/*</ImgCrop>*/}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label='Видео:'
                                name={'video'}
                                // rules={[{required: true, message: ' Видео'}]}
                            >
                                {/*<ImgCrop>*/}
                                <Upload
                                    maxCount={1}
                                    fileList={fileListPropsVideo}
                                    listType='picture-card'
                                    onChange={onChangeImageVideo}
                                    onPreview={onPreviewImage}
                                    beforeUpload={(file) => checkFormat(file)}
                                >
                                    {fileListPropsVideo.length > 0 ? "" : "Upload"}
                                </Upload>
                                {/*</ImgCrop>*/}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <FormInput
                                required={true}
                                required_text={' название пиксели экрана'}
                                label={' пиксели экрана'}
                                name={'screenPixel'}
                            />
                        </Col>
                        <Col span={6}>
                            <FormInput
                                required={true}
                                required_text={' название пиксели экрана'}
                                label={' размер экрана'}
                                name={'screenSize'}
                            />
                        </Col>
                        {/*screenSize*/}
                        <Col span={6}>
                            <Form.Item
                                label="время начала"
                                name={'toHour'}
                            >
                                <TimePicker
                                    format="HH:mm"
                                    hourStep={1}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="время окончания"
                                name={'fromHour'}
                            >
                                <TimePicker
                                    format="HH:mm"
                                    hourStep={1}
                                />
                            </Form.Item>
                        </Col>



                    </Row>
                    <Button type="primary" htmlType="submit" style={{width: "100%", marginTop: "20px"}}>
                        {editLocationSuccess ? 'Редактировать' : 'Создать'}
                    </Button>
                </Form>}
        </div>);
};
export default LedScreenPostEdit;

