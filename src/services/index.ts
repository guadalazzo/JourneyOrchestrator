import { Mission } from '../types/missionManagment.types';
const API_URL = 'http://localhost:3000';
const headers = {
  headers: { 'Content-Type': 'application/json' },
};

export const getMissions = async () => {
  try {
    const missionsResponse = await fetch(`${API_URL}/missions`);
    const parsedRes = await missionsResponse.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};

export const getMission = async (id: string) => {
  try {
    const missionsResponse = await fetch(`${API_URL}/missions/${id}`);
    const parsedRes = await missionsResponse.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};
export const updateMission = async (id: string, payload: Mission) => {
  try {
    const requestOptions = {
      ...headers,
      method: 'PUT',
      body: JSON.stringify(payload),
    };
    const missionsResponse = await fetch(`${API_URL}/missions/${id}`, requestOptions);
    const parsedRes = await missionsResponse.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};
export const createNewMission = async (payload: Mission) => {
  try {
    const requestOptions = {
      ...headers,
      method: 'POST',
      body: JSON.stringify(payload),
    };
    const missionsResponse = await fetch(`${API_URL}/missions`, requestOptions);
    const parsedRes = await missionsResponse.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};
