export type Occupation = {
  id: string;
  name: string;
  type?: string;
  description?: string;
  attributes?: string[];
  race?: string[];
  requirements?: {
    attributes?: string[];
    race?: string[];
    tratis?: string[];
  }
  gifts?: string[];
  job?: boolean;
}

export const occupations: Occupation[] = [
];


export type OccupationParams = {
  id?: string;
  name?: string;
  job?: boolean;
}