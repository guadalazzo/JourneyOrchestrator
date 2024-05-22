export const API_URL = 'http://localhost:3000';

export const headers = {
  headers: { 'Content-Type': 'application/json' },
};

export const METHODS = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };
export const ROUTES = {
  BASE_URL: '/',
  EDIT: '/edit/:id',
  CREATE: '/create',
};
export const MEMBER_TYPES = {
  ENGINEER: 'engineer',
  PILOT: 'pilot',
  PASSENGER: 'passenger',
};