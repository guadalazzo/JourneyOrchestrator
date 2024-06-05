export const API_URL = 'http://localhost:3000';

export const headers = {
  headers: { 'Content-Type': 'application/json' },
};

export const METHODS = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };
export const ROUTES = {
  BASE_URL: '/',
  BASE_URL_APP: '/JourneyOrchestrator',
  EDIT: '/JourneyOrchestrator/edit/:id',
  CREATE: '/JourneyOrchestrator/create',
};
export const MEMBER_TYPES = {
  ENGINEER: 'engineer',
  PILOT: 'pilot',
  PASSENGER: 'passenger',
};
