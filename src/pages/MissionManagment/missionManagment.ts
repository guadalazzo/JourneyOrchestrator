export type Pilot = {
  type: 'pilot';
  experience: string;
};

export type Engineer = {
  type: 'engineer';
  experience: string;
  job: 'Navigation' | 'Solar panels' | 'Maintenance' | 'Mechanics' | 'Navigation';
};

export type Passenger = {
  type: 'passenger';
  name: string;
  age: number;
  wealth: number;
};
export type Member = Pilot | Engineer | Passenger;

export type Mission = {
  name: string;
  destination: string;
  date: string;
  members: Member[] | never[];
};
