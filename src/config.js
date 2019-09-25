export const API_BASE_URL = 'http://localhost:4000';

export const Role = {
  MANAGER: 'manager',
  LEAD: 'lead',
  DEVELOPER: 'developer'
}

export const paths = {
  LOGIN_PAGE: '/login',
  DASHBOARD_PAGE: '/',
  USERS: '/users',
  USER: '/users/:id',
  USER_EDITOR_PAGE: '/users/:id/edit'
}

export const nonAuthRoutes = [
  paths.LOGIN_PAGE
]