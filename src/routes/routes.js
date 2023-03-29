
import config from '../config';

// Layouts
import { AuthLayout, NoRecommendLayout } from '../layouts';

// Page
import Home from 'pages/Home';
import Signin from 'pages/Signin';
import UserProfile from 'pages/UserProfile';
import { StudentList, StudentCreate2, StudentCreate } from 'features/student'
import { SessionList } from 'features/authSession';
import { DeviceList } from 'features/device';
import { AccountList, AccountCreate } from 'features/account';
const publicRouters = [
    // Auth
    { path: config.routes.home, component: Home },
    { path: config.routes.userProfile, component: UserProfile, privateRoute: true },

    // Sigin
    {
        path: config.routes.signin, component: Signin,
        layout: AuthLayout
    },

    // Student
    {
        path: config.routes.student, component: StudentList,
        layout: NoRecommendLayout,
    },
    {
        path: config.routes.studentCreate, component: StudentCreate,
        layout: NoRecommendLayout,
    },
    {
        path: config.routes.studentCreate2, component: StudentCreate2,
        layout: NoRecommendLayout,
    },

    // Account
    {
        path: config.routes.account, component: AccountList,
        layout: NoRecommendLayout,
    },
    {
        path: config.routes.accountCreate, component: AccountCreate,
        layout: NoRecommendLayout,
    },

    // Device
    {
        path: config.routes.device, component: DeviceList,
        layout: NoRecommendLayout,
    },

    // Session
    {
        path: config.routes.session, component: SessionList,
        layout: NoRecommendLayout,
    },

    // Report
    { path: config.routes.report, component: Home },

];

// Private routes
const privateRouters = [];

export { publicRouters, privateRouters };