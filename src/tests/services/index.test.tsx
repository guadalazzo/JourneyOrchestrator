/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { deleteMission, getMissions, getMission, updateMission, createNewMission } from '../../services';
import { API_URL, METHODS } from '../../utils/consts';

describe('Service API Functions', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reset mock function state before each test
  });

  const mockFetch = jest.fn();

  beforeEach(() => {
    (global as any).fetch = mockFetch;
  });

  const mockFetchResponse = (response: any, status: number = 200) => {
    return Promise.resolve({
      status,
      json: () => Promise.resolve(response),
    });
  };

  it('getMissions should fetch missions successfully', async () => {
    const mockResponse = [{ id: '1', name: 'Mission 1' }];
    mockFetch.mockResolvedValueOnce(mockFetchResponse(mockResponse));
    const missions = await getMissions();
    expect(missions).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/missions`);
  });

  it('createNewMission ', async () => {
    const mockResponse = {
      name: 'Mission 2',
      date: '10/03/2024',
      destination: 'Pluton',
      members: [],
    };
    mockFetch.mockResolvedValueOnce(mockFetchResponse(undefined));
    await createNewMission(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/missions`, {
      headers: { 'Content-Type': 'application/json' },
      method: METHODS.POST,
      body: '{"name":"Mission 2","date":"10/03/2024","destination":"Pluton","members":[]}',
    });
  });

  it('updateMission by id', async () => {
    const mockResponse = {
      id: '1',
      name: 'Mission 1',
      date: '10/09/2024',
      destination: 'Pluton',
      members: [],
    };
    mockFetch.mockResolvedValueOnce(mockFetchResponse(undefined));
    await updateMission(mockResponse.id, mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/missions/${mockResponse.id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: METHODS.PUT,
      body: '{"id":"1","name":"Mission 1","date":"10/09/2024","destination":"Pluton","members":[]}',
    });
  });

  it('getMission by id', async () => {
    mockFetch.mockResolvedValueOnce(mockFetchResponse(undefined));

    await getMission('2cd');
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/missions/2cd`);
  });

  it('deleteMission should delete mission successfully', async () => {
    mockFetch.mockResolvedValueOnce(mockFetchResponse(undefined));

    await deleteMission('2er');

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/missions/2er`, {
      headers: { 'Content-Type': 'application/json' },
      method: METHODS.DELETE,
    });
  });
});
