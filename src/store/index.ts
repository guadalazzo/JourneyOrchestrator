import { configureStore } from '@reduxjs/toolkit';
import missionManagmentReducer from './missionManagment/missionManagment';
export default configureStore({
  reducer: {
    missionManagment: missionManagmentReducer,
  },
});
