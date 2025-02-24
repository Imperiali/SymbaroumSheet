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
  { id: 'artifact-crafter', name: 'Criador de Artefatos' },
  { id: 'troll-singer', name: 'Cantor Troll' },
  { id: 'staff-magister', name: 'Magista do Cajado' },
  { id: 'symbolist', name: 'Simbolista' },
  { id: 'confessor', name: 'Confessor' },
  { id: 'demonologist', name: 'Demonologista' },
  { id: 'inquisitor', name: 'Inquisidor' },
  { id: 'sapper', name: 'Sapador' },
  { id: 'weapon-master', name: 'Mestre de Armas' },
  { id: 'iron-sworn', name: 'Jurado do Ferro' },
  { id: 'axe-artist', name: 'Artista do Machado' },
  { id: 'spear-dancer', name: 'Dançarino da Lança' }
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