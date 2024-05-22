import { Mission } from '../types/missionManagment.types';
import { API_URL, headers, METHODS } from '../utils/consts';

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
      method: METHODS.PUT,
      body: JSON.stringify(payload),
    };
    const missionsResponse = await fetch(`${API_URL}/missions/${id}`, requestOptions);
    const parsedRes = await missionsResponse.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};
export const deleteMission = async (id: string) => {
  try {
    const requestOptions = {
      ...headers,
      method: METHODS.DELETE,
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
      method: METHODS.POST,
      body: JSON.stringify(payload),
    };
    const missionsResponse = await fetch(`${API_URL}/missions`, requestOptions);
    const parsedRes = await missionsResponse.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};
