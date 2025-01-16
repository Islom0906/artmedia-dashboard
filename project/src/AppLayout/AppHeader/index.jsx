import './index.scss'
import { SunOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex } from "antd";
import { Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { changeThemeMode } from "../../store/slice/themeSlice";
import { authData } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { BsMoon } from "react-icons/bs";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

const AppHeader = () => {
    const { systemMode } = useSelector(state => state.theme)
    const { data: { user } } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refToken')
        dispatch(authData({
            user: null,
            isLoading: false,
            isAuthenticated: false
        }))
        navigate('/login')
    }

    return (
        <Header
            className={'app-header'}
            style={{
                backgroundColor: '#1f1f1f',
                color: '#ffffff',
                padding: '0 20px',
            }}
        >
            <Flex style={{ width: 250, height: 40 }} align={"center"} justify={"center"}>
                        <img className={'logo'}
                             src={`/logo 3.png`}
                             style={{ width: '100%', height: '100%', objectFit: "contain" }}
                        />
            </Flex>
            <Flex align={"center"}>
                <UserAccount user={user} logOut={logOut} />
            </Flex>
        </Header>
    );
};

export default AppHeader;

export const UserAccount = ({ user, logOut }) => {
    const screens = useBreakpoint();
    const chartHeight = screens.md;
    const items = [
        {
            key: '2',
            label: (
                <div onClick={logOut}>
                    Выход
                </div>
            ),
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
            placement="topRight"
            className={'userDropdown'}
            arrow
        >
            <Button
                style={{
                    backgroundColor: '#333',
                    color: '#ffffff',
                    border: 'none',
                }}
            >
                        <UserOutlined className={'icon'} />
                {
                    chartHeight &&
                    <span className={'content'} style={{ padding: '10 0' }}>
            <Flex className={'title'} gap={5} style={{ fontSize: 12, color: '#ffffff' }}>
              <span>{user?.name}</span>
            </Flex>
          </span>
                }
            </Button>
        </Dropdown>
    )
}
