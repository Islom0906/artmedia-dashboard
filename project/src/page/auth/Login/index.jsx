import {Button, Card, Col, Divider, Form, Input, message, Row, theme} from "antd";
import {setAuthToken} from "../../../service/auth/axios";
import {useDispatch, useSelector} from "react-redux";
import {authData} from "../../../store/slice/authSlice";
import apiService from "../../../service/apis/api";
import './index.scss'
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect} from "react";

const Login = () => {
    const {data:{isLoading , isAuthenticated}}=useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate=useNavigate()


    const onFinish = useCallback(async (values) => {
        dispatch(authData({
            user: null,
            isLoading: true,
            isAuthenticated: false,
        }));
        if (localStorage.getItem('token')) {
            localStorage.removeItem('refToken');
        }
        try {
            const data = await apiService.postData('/auth', values);
            localStorage.setItem('token', data?.access);
            // localStorage.setItem('refToken', data?.refresh);
            setAuthToken(data.access);
            const userInfo = await apiService.getData('/user/me');
            dispatch(authData({
                user: userInfo,
                isLoading: false,
                isAuthenticated: true,
            }));
            navigate('/');
            message.success('Успешно');
        } catch (error) {
            message.error(error?.response?.data?.detail);
            dispatch(authData({
                user: null,
                isLoading: false,
                isAuthenticated: false,
            }));
        }
    }, [dispatch, navigate]);


    useEffect(() => {
        if(isAuthenticated && localStorage.getItem('app-version') === 1 ) {
            localStorage.setItem('app-version'  , 1)
        }
    } , [isAuthenticated])

    return (
        <div className={'login-wrapper'}>
            <div className="login-container">
                <Card size={"small"} className="login-card" style={{padding: '0'}}>
                    <h2 className="login-title">Вход</h2>
                    <p className={"login-subTitle"}>Пожалуйста, войдите в свою учетную запись</p>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            login: '',
                            password: ''
                        }}
                        onFinish={onFinish}
                        autoComplete="on"
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    label="имя"
                                    name="login"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please put your name!',
                                        },
                                    ]}
                                >
                                    <Input placeholder={'Введите адрес электронной имя'}/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label="Пароль"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please put your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder={'Напишите свой пароль'}/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{width: '100%'}}
                                            disabled={isLoading}>
                                        Войти
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                    <Divider className={'login-footer'}>MEDIA-CITY.UZ</Divider>
                </Card>
            </div>
        </div>

    );
};

export default Login;