export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

export interface ISong {
  id: number;
  title: string;
  band: number;
}

export interface IBand {
  id: number;
  title: string;
}

export interface ISelectValue {
  value: number;
  label: string;
}
