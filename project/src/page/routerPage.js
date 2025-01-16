import {
    Dashboard , LedScreenPostEdit
} from './index'

import {RxDashboard} from "react-icons/rx";





export const samplePagesConfigs = [
    {
        key: 1,
        icon: <RxDashboard className={'icon'} style={{fontSize: 24, height: '100%'}}/>,
        path: '/dashboard',
        label: 'Панель',
        element: Dashboard,
        isBackground: false
    },
    {
        key: 3,
        path: '/led-screen/add',
        element: LedScreenPostEdit,
        isBackground: false
    },

    // {
    //     key: 12321232312312312,
    //     icon: <GrStatusInfo className={'icon'} style={{fontSize: 24, height: '100%'}}/>,
    //     path: '/support',
    //     label: 'Поддерживать',
    //     element: Support,
    //     permittedRole: [authRole.admin, authRole.user, authRole.boss ,  authRole.director , authRole.general_director],
    //     isBackground: false
    // },
];