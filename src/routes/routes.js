
import config from '../config';

// Layouts
import { AuthLayout, NoRecommendLayout } from '../layouts';

// Page
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import UserProfile from '../pages/UserProfile';
import { StudentList } from '../features/student'

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

    // Staff
    { path: config.routes.staff, component: Home },

    // Device
    { path: config.routes.device, component: Home },

    // Report
    { path: config.routes.report, component: Home },

];

// Private routes
const privateRouters = [];

export { publicRouters, privateRouters };