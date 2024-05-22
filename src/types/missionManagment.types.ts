export type Pilot = {
  type: 'pilot';
  experience: string;
};
export type Job = 'Navigation' | 'Solar panels' | 'Maintenance' | 'Mechanics';

export type Engineer = {
  type: 'engineer';
  experience: string;
  job: Job;
};

export type Passenger = {
  type: 'passenger';
  age: string;
  wealth: string;
};
export type Member = Pilot | Engineer | Passenger;

export type Mission = {
  id?: string;
  name: string;
  destination: string;
  date: string;
  members: Member[] | never[];
};
export type CreatedMission = {
  id: string;
  name: string;
  destination: string;
  date: string;
  members: Member[] | never[];
};
export type MissionReducer = {
  isValid: boolean;
  errorMessage: string;
  missions: never[];
};
export interface reducer {
  missionManagment: MissionReducer;
}
