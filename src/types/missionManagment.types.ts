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
  name: string;
  age: number;
  wealth: number;
};
export type Member = Pilot | Engineer | Passenger;

export type Mission = {
  id?: string;
  name: string;
  destination: string;
  date: string;
  members: Member[] | never[];
};
