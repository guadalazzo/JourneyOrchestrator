import missionManagmentReducer, { validate } from '../../store/missionManagment/missionManagment';
import * as services from '../../services';

jest.mock('../../services', () => ({
  ...jest.requireActual('../../services'), // Use the actual implementation of other functions
  createNewMission: jest.fn(), // Mock the createNewMission function
  updateMission: jest.fn(),
}));

describe('missionManagmentReducer', () => {
  const initialState = {
    isValid: false,
    errorMessage: '',
    missions: [],
  };

  it('should return the initial state', () => {
    expect(missionManagmentReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should handle validate action when no members are added to the mission', () => {
    const action = validate({ members: [] });
    const newState = missionManagmentReducer(initialState, action);
    expect(newState.isValid).toBe(false);
    expect(newState.errorMessage).toBe('No members added to the mission');
  });

  it('should handle validate action when no pilot are added to the mission', () => {
    const action = validate({ members: [{ type: 'passenger', age: '20', wealth: '1000' }] });
    const newState = missionManagmentReducer(initialState, action);
    expect(newState.isValid).toBe(false);
    expect(newState.errorMessage).toBe('No pilot in the mission');
  });

  it('should handle validate action when more than one pilot is added to the mission', () => {
    const action = validate({
      members: [
        { type: 'pilot', experience: '11' },
        { type: 'pilot', experience: '21' },
      ],
    });
    const newState = missionManagmentReducer(initialState, action);
    expect(newState.isValid).toBe(false);
    expect(newState.errorMessage).toBe("There's more than one pilot ");
  });
  it('should handle validate action when more the Pilot has Not enought experience', () => {
    const action = validate({
      members: [{ type: 'pilot', experience: '09' }],
    });
    const newState = missionManagmentReducer(initialState, action);
    expect(newState.isValid).toBe(false);
    expect(newState.errorMessage).toBe('The Pilot has not enought experience');
  });
  it('should handle validate action when more than one engineer have the same job', () => {
    const action = validate({
      members: [
        { type: 'pilot', experience: '12' },
        { type: 'engineer', experience: '09', job: 'Mechanics' },
        { type: 'engineer', experience: '5', job: 'Mechanics' },
      ],
    });
    const newState = missionManagmentReducer(initialState, action);
    expect(newState.isValid).toBe(false);
    expect(newState.errorMessage).toBe('The engineers jobs are duplicated');
  });
  it('should handle validate action when members are ok', () => {
    const action = validate({
      members: [
        { type: 'pilot', experience: '12' },
        { type: 'engineer', experience: '09', job: 'Mechanics' },
        { type: 'engineer', experience: '5', job: 'Maintenance' },
      ],
    });
    const newState = missionManagmentReducer(initialState, action);
    expect(newState.isValid).toBe(false);
    expect(newState.errorMessage).toBe('No passengers added to the mission');
  });

  it('should handle validate action when there is not passengers on board', () => {
    const action = validate({
      members: [
        { type: 'pilot', experience: '12' },
        { type: 'engineer', experience: '09', job: 'Mechanics' },
        { type: 'engineer', experience: '5', job: 'Maintenance' },
      ],
    });
    const newState = missionManagmentReducer(initialState, action);
    expect(newState.isValid).toBe(false);
    expect(newState.errorMessage).toBe('No passengers added to the mission');
  });

  it('validate actio should call create new mission when members are ok', async () => {
    (services.createNewMission as jest.Mock).mockResolvedValueOnce(undefined);
    const action = validate({
      members: [
        { type: 'pilot', experience: '12' },
        { type: 'engineer', experience: '09', job: 'Mechanics' },
        { type: 'engineer', experience: '5', job: 'Maintenance' },
        { type: 'passenger', age: '20', wealth: '1000' },
      ],
    });
    const newState = missionManagmentReducer(initialState, action);
    expect(newState.isValid).toBe(true);
    expect(services.createNewMission).toHaveBeenCalled();
  });
  it('validate action should call updateMission when members are ok', async () => {
    (services.updateMission as jest.Mock).mockResolvedValueOnce(undefined);
    const action = validate({
      id: '020',
      members: [
        { type: 'pilot', experience: '12' },
        { type: 'engineer', experience: '09', job: 'Mechanics' },
        { type: 'engineer', experience: '5', job: 'Maintenance' },
        { type: 'passenger', age: '20', wealth: '1000' },
      ],
    });
    const newState = missionManagmentReducer(initialState, action);
    expect(newState.isValid).toBe(true);
    expect(services.updateMission).toHaveBeenCalled();
  });
});
