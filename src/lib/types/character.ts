import type { Ability } from "./ability";
import type { Occupation } from "./occupation";
import type { Trait } from "./traits";
import type { Weapon } from "./weapon";
import type { Armor } from "./armor";

export type Character = {
  // Informações Básicas
  name: string;
  race: string;
  occupation?: Occupation | string;
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

  // Bônus de Atributos
  attributesBonuses: {
    accurate?: number;
    cunning?: number;
    discreet?: number;
    persuasive?: number;
    quick?: number;
    resolute?: number;
    strong?: number;
    vigilant?: number;
  };

  // Status
  toughness: {
    base: number;
    current: number;
  };

  // Combate
  armor: Array<Partial<Armor>>;
  weapons: Array<Partial<Weapon>>;

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
  abilities: Array<Ability>;

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

  //Traços, Dádivas e Fardos
  traits: Array<Trait>;

  // Anotações
  notes: Array<{
    title: string;
    description: string;
  }>;
};
