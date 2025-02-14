export type TraitType = 'Trait' | 'Boon' | 'Burden';

export type TraitActionType =  'Reaction' | 'Special' | 'Active' | 'Passive' | 'Free' | 'Full turn';

export type TraitClassification = 'N' | 'A' | 'M';

export type TraitClassificationObj = {
  description: string;
  action: TraitActionType;
}

export interface Trait {
  id: string;
  name: string;
  type: TraitType;
  classification?: Array<TraitClassification>;
  description: string;
  novice?: TraitClassificationObj
  adept?: TraitClassificationObj
  master?: TraitClassificationObj
}

export function formattedClassification(classification: TraitClassification) {
  switch (classification) {
    case 'N':
      return 'Novato';
    case 'A':
      return 'Adepto';
    case 'M':
      return 'Mestre';
    default:
      return '';
  }
}

export function getTraitActionType(classification: TraitClassificationObj) {
  switch (classification.action) {
    case 'Reaction':
      return 'Reação';
    case 'Active':
      return 'Ativo';
    case 'Free':
      return 'Livre';
    case 'Full turn':
      return 'Turno Completo';
    case 'Passive':
      return 'Passiva';
    case 'Special':
    default:
      return 'Especial';
  }
}
