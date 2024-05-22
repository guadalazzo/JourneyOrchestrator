/**
 * @jest-environment jsdom
 */
// @ts-nocheck

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Missions from '../../../pages/Missions/index.tsx';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from '../../../utils/consts';
import { CreatedMission } from '../../../types/missionManagment.types';

const mockStore = configureStore([]);
const mockFetch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../../../services', () => ({
  getMissions: jest.fn(),
  deleteMission: jest.fn(),
}));

import { getMissions, deleteMission } from '../../../services';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useParams: jest.fn(),
    useNavigate: () => mockNavigate,
  };
});
describe('Missions', () => {
  let store;
  const mockMissions: CreatedMission[] = [
    { id: '1', name: 'Mission 1', date: '10/09/2024' },
    { id: '2', name: 'Mission 2', date: '10/09/2024' },
  ];
  beforeEach(() => {
    store = mockStore({
      missionManagment: {
        isValid: true,
        missions: [],
      },
    });
    (global as any).fetch = mockFetch;

    jest.clearAllMocks();
  });
  it('renders Missions component', async () => {
    getMissions.mockResolvedValueOnce(mockMissions);

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Missions />
          </BrowserRouter>
        </Provider>,
      );
    });

    await waitFor(() => expect(getMissions).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Missions')).toBeInTheDocument();
    expect(screen.getByText('Mission 1')).toBeInTheDocument();
    expect(screen.getByText('Mission 2')).toBeInTheDocument();
  });
  it('deletes a mission and reloads the list', async () => {
    getMissions.mockResolvedValueOnce(mockMissions);
    deleteMission.mockResolvedValueOnce({});
    getMissions.mockResolvedValueOnce(mockMissions.filter((mission) => mission.id !== '1'));

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Missions />
          </BrowserRouter>
        </Provider>,
      );
    });

    await waitFor(() => expect(getMissions).toHaveBeenCalledTimes(1));

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });

    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    await waitFor(() => expect(deleteMission).toHaveBeenCalledWith('1'));
    await waitFor(() => expect(getMissions).toHaveBeenCalledTimes(2));

    expect(screen.queryByText('Mission 1')).not.toBeInTheDocument();
    expect(screen.getByText('Mission 2')).toBeInTheDocument();
  });
});
