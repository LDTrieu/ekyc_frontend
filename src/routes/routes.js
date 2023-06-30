
import config from '../config';

// Layouts
import { AuthLayout, NoRecommendLayout, RequireLoginLayout, AuthorizationLayout, AuthNoRecommendLayout } from '../layouts';

// Page
import Home from 'pages/Home';
import Signin from 'pages/Signin';
import Forbidden from 'pages/Forbidden';
import UserProfile from 'pages/UserProfile';
import { StudentList, StudentCreate2, StudentCreate } from 'features/student'
import { SessionList } from 'features/authSession';
import { DeviceList } from 'features/device';
import { AccountList, AccountCreate } from 'features/account';
import { ReportList } from 'features/report';
const publicRouters = [
    // Auth
    { path: config.routes.home, component: Home },
    { path: config.routes.userProfile, component: UserProfile, privateRoute: true },
    {
        path: config.routes.forbidden, component: Forbidden,
    },

    // Sigin
    {
        path: config.routes.signin, component: Signin,
        layout: AuthLayout
    },

    // Student
    {
        path: config.routes.student, component: StudentList,
        layout: AuthNoRecommendLayout,
    },
    {
        path: config.routes.studentCreate, component: StudentCreate,
        layout: AuthNoRecommendLayout,
    },
    {
        path: config.routes.studentCreate2, component: StudentCreate2,
        layout: AuthNoRecommendLayout,
    },

    // Account
    {
        path: config.routes.account, component: AccountList,
        layout: AuthNoRecommendLayout,
    },
    {
        path: config.routes.accountCreate, component: AccountCreate,
        layout: AuthNoRecommendLayout,
    },

    // Device
    {
        path: config.routes.device, component: DeviceList,
        layout: AuthNoRecommendLayout,
    },

    // Session
    {
        path: config.routes.session, component: SessionList,
        layout: NoRecommendLayout,
    },

    // Report
    {
        path: config.routes.report, component: ReportList,
        layout: NoRecommendLayout,
    },

];

// Private routes
const privateRouters = [];

export { publicRouters, privateRouters };