import { paths, Role } from './config';

import LoginPage from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';

export default [
  { path: paths.LOGIN_PAGE, component: LoginPage, exact: true, auth: false },
  { path: paths.DASHBOARD_PAGE, component: Dashboard, exact: true, auth: true }
];

export const routeAccessability = {
  [paths.DASHBOARD_PAGE]: (roles, match) => !roles.includes(Role.MANAGER)
};
