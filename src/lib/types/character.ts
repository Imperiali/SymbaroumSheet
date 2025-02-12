export type Character = {
    // Informações Básicas
    name: string;
    playerId: string;
    race: string;
    occupation?: string;
    experience: number;
    currentExperience: number;
    shadow: string;
    quote: string;
    idade?: string;      // Optional age field
    altura?: string;     // Optional height field
    peso?: string;       // Optional weight field
    aparencia?: string;  // Optional appearance field
    historico?: string;  // Optional background field
    objetivoPessoal?: string; // Optional personal goal field
    imagemUrl?: string;  // Optional character image URL
    painThreshold: number;
    vitality: {
        current: number;
        max: number;
    };
    corruption: {
        current: number;
        permanent: number;
    };
    corruptionThreshold: number;

    // Atributos
    attributes: {
        accurate: number;
        cunning: number;
        discreet: number;
        persuasive: number;
        quick: number;
        resolute: number;
        strong: number;
        vigilant: number;
    };

    // Status
    toughness: {
        base: number;
        current: number;
    };

    // Combate
    armor: Array<{
        name: string;
        protection: number;
        quality: string;
    }>;
    weapons: Array<{
        name: string;
        grace: string;
        damage: string;
        quality: string;
        attribute: string;
    }>;

    // Equipamento e Riqueza
    money: {
        thaler: number;
        shilling: number;
        orteg: number;
    };

    equipment: Array<{ 
        name: string; 
        description: string; 
    }>;

    // Habilidades e Poderes
    abilities: Array<{
        name: string;
        effect: string;
        type: string;
        classification: 'N' | 'A' | 'M';
    }>;

    // Amigos e Companheiros
    companions: Array<{
        name: string;
        race: string;
        occupation: string;
        player: string;
    }>;

    // Artefatos e Tesouros Místicos
    artifacts: Array<{
        name: string;
        powers: string;
        corruption: string;
        bonus: string;
    }>;

    notes: Array<{
        title: string;
        description: string;
    }>;
};
