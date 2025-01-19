import { Button, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsBoxArrowInLeft, BsBoxArrowInRight } from 'react-icons/bs';
import './index.scss';
import {LuMonitorCog} from "react-icons/lu";
import {FcStatistics} from "react-icons/fc";

const AppSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth < 992);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Sider
            width={270}
            collapsedWidth={60}
            // collapsible
            collapsed={collapsed}
            onCollapse={toggleCollapsed}
            style={{
                height: '100vh',
                backgroundColor: '#1f1f1f',
            }}
        >
            <Menu
                mode="inline"
                defaultOpenKeys={['sub1']}
                style={{
                    height: '100%',
                    borderRight: 0,
                    backgroundColor: '#1f1f1f',
                    color: '#ffffff',
                }}
                theme="dark"
            >
                <Menu.SubMenu
                    key="sub1"
                    icon={<FcStatistics style={{ color: '#ffffff' }} />}
                    title="Наружная реклама"
                    style={{ color: '#ffffff' }}
                >
                    <Menu.Item key="1" style={{ color: '#ffffff' }}>
                        <Link to="/dashboard">Led экраны</Link>
                    </Menu.Item>
                    <Menu.Item disabled={true} key="2" style={{ color: '#ffffff' }}>
                        Крышные конструкции
                    </Menu.Item>
                    <Menu.Item disabled={true} key="3" style={{ color: '#ffffff' }}>
                        Билборды
                    </Menu.Item>
                    <Menu.Item disabled={true} key="4" style={{ color: '#ffffff' }}>
                        Брандмауэры
                    </Menu.Item>
                    <Menu.Item disabled={true} key="5" style={{ color: '#ffffff' }}>
                        Сити-форматы
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
            <Button
                icon={
                    collapsed ? (
                        <BsBoxArrowInRight style={{ fontSize: 24, color: '#ffffff' }} />
                    ) : (
                        <BsBoxArrowInLeft style={{ fontSize: 24, color: '#ffffff' }} />
                    )
                }
                onClick={toggleCollapsed}
                style={{
                    width: '100%',
                    border: 0,
                    backgroundColor: '#1f1f1f',
                    color: '#ffffff',
                    position: 'absolute',
                    bottom: 16,
                }}
            >
                {!collapsed && 'Закрыть'}
            </Button>
        </Sider>
    );
};

export default AppSidebar;
