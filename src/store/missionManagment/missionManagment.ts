import { createSlice } from '@reduxjs/toolkit';
import { Member, Job, Pilot, Engineer, Passenger } from '../../types/missionManagment.types';
import { hasDuplicates } from '../../utils';
import { createNewMission, updateMission } from '../../services/index';
import { Mission } from '../../types/missionManagment.types';
import { MEMBER_TYPES } from '../../utils/consts';

async function createNew(payload: Mission) {
  await createNewMission(payload);
}
async function postCurrent(payload: Mission) {
  if (payload.id) {
    await updateMission(payload?.id, payload);
  }
}
export const missionManagmentReducer = createSlice({
  name: 'missionManagment',
  initialState: {
    isValid: false,
    errorMessage: '',
    missions: [],
  },
  reducers: {
    validate: (state, action) => {
      state.isValid = false;
      if (!action.payload.members.length) {
        state.errorMessage = 'No members added to the mission';
      }

      if (action.payload.members.length) {
        // List of pilots
        const members = action.payload.members;
        const pilotList = members.filter((member: Pilot) => member.type === MEMBER_TYPES.PILOT);
        if (!pilotList.length) {
          state.errorMessage = 'No pilot in the mission';
          state.isValid = false;
          return;
        }
        const isUniquePilot = pilotList.length === 1;
        if (!isUniquePilot) {
          state.errorMessage = "There's more than one pilot ";
          state.isValid = false;
          return;
        }
        const thePilot = pilotList[0];
        const hasEnoughExp = Number(thePilot.experience) >= 10;
        if (!hasEnoughExp) {
          state.errorMessage = 'The Pilot has not enought experience';
          state.isValid = false;
          return;
        }
        // Check engineers
        // list of jobs
        const jobs: Job[] = [];
        members.forEach((member: Engineer) => {
          if (member.type === MEMBER_TYPES.ENGINEER) {
            jobs.push(member.job);
          }
        });
        const checkDuplicates = hasDuplicates(jobs);
        if (checkDuplicates) {
          state.errorMessage = 'The engineers jobs are duplicated';
          return;
        }
        const passengers = members.filter((member: Passenger) => member.type === MEMBER_TYPES.PASSENGER);
        if (!passengers.length) {
          state.errorMessage = 'No passengers added to the mission';
          state.isValid = false;
          return;
        }
        state.errorMessage = '';
        state.isValid = true;
        if (action.payload.id) {
          postCurrent(action.payload);
        } else {
          createNew(action.payload);
        }
      }
    },
    setMissionsA: (state, action) => {
      state.missions = action.payload;
    },
    reset: (state) => {
      state.isValid = false;
      state.errorMessage = '';
    },
  },
});

export const { validate, setMissionsA, reset } = missionManagmentReducer.actions;

export default missionManagmentReducer.reducer;
