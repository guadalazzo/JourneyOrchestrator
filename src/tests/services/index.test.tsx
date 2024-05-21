import { getMissions } from '../../services';

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
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/missions');
  });
});
