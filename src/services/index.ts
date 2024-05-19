const API_URL = 'http://localhost:3000';

export const getMissions = async () => {
  try {
    const missionsResponse = await fetch(`${API_URL}/missions`);
    const parsedRes = await missionsResponse.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};
