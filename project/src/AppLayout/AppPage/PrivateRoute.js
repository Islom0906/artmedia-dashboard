import React from 'react';
import BackgroundContent from "./BackgrountContent/index";

const PrivateRoute = ({ component: Component, isBackground }) => {
    return (
        <>
            {isBackground && <BackgroundContent />}
            <Component />
        </>
    );
};

export default PrivateRoute;