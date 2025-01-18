import {Content} from "antd/es/layout/layout";
import './index.scss'
import {Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import {samplePagesConfigs} from "../../page/routerPage";
import {initialUrl} from "../../constants/defaultConfig";

const AppPage = () => {


    return (
        <Content
            style={{
                padding: 20,
                overflowY: "scroll",
                height:'100%',
                overflowX:'hidden !import'
            }}
        >
            <Routes>
                {samplePagesConfigs.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <PrivateRoute
                                component={route.element}
                                isBackground={route.isBackground}
                            />
                        }
                    />
                ))}
                <Route path="/" element={<Navigate to={initialUrl} replace/>}/>
            </Routes>
        </Content>
    );
};

export default AppPage;