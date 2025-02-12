import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
    const characterName = params.character;

    // Validar o nome do personagem
    if (!characterName || characterName.trim().length === 0) {
        throw error(400, 'Nome do personagem inválido');
    }

    return {
        characterName
    };
};
