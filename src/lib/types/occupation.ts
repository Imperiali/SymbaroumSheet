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

export async function getOccupations(): Promise<Occupation[]> {
  return Promise.resolve(occupations);
}

export function getOccupationById(id: string): Occupation | undefined {
  return occupations.find(occupation => occupation.id === id);
}

export function getOccupationName(id: string): string {
  return getOccupationById(id)?.name || id;
}

export type OccupationParams = {
  id?: string;
  name?: string;
  job?: boolean;
}