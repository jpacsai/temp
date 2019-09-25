import { paths, Role } from './config';

import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

export default [
  { path: paths.LOGIN_PAGE, component: LoginPage, exact: true, auth: false},
  { path: paths.DASHBOARD_PAGE, component: Dashboard, exact: true, auth: true }
];

export const routeAccessability = {
  [paths.DASHBOARD_PAGE]: (roles, match) => !roles.includes(Role.MANAGER)
};