export type Race = {
    id: string;
    name: string;
}

export const races: Race[] = [
    { id: 'human-ambriano', name: 'Humano (Ambriano)' },
    { id: 'human-barbaro', name: 'Humano (Bárbaro)' },
    { id: 'changeling', name: 'Cambiante' },
    { id: 'goblin', name: 'Goblin' },
    { id: 'ogre', name: 'Ogro' },
    { id: 'elf', name: 'Elfo' },
    { id: 'dwarf', name: 'Anão' },
    { id: 'abducted-human', name: 'Humano Sequestrado' },
    { id: 'troll', name: 'Troll' },
    { id: 'undead', name: 'Morto-Vivo' }
];

export async function getRaces(): Promise<Race[]> {
    return Promise.resolve(races);
}

export function getRaceById(id: string): Race | undefined {
    return races.find(race => race.id === id);
}

export function getRaceName(id: string): string {
    return getRaceById(id)?.name || id;
}
