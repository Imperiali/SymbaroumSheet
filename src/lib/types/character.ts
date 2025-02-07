export type Character = {
    // Informações Básicas
    name: string;
    race: string;
    occupation: string;
    experience: number;
    currentExperience: number;
    shadow: string;
    quote: string;

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
    corruption: {
        temporary: number;
        permanent: number;
    };
    toughness: {
        base: number;
        current: number;
    };
    painThreshold: number;

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
        level: number;
        effect: string;
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
};
