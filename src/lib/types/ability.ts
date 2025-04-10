export type AbilityType = 'Ability' | 'Mystical Power' | 'Ritual';

export type AbilityClassification = 'N' | 'A' | 'M';

export type AbilityActionType = 'Reaction' | 'Special' | 'Active' | 'Passive' | 'Free' | 'Full turn';

export type AbilityClassificationObj = {
  description: string;
  action: AbilityActionType;
}

export type AbilityRequirement = {
  attribute?: {
    name: string;
    value: number;
  };
  race?: string[];
  occupation?: string[];
  abilities?: string[];
  corruption?: number;
};

export type AbilityEffect = {
  description: string;
  corruptionCost?: number;
  duration?: string;
  range?: string;
  target?: string;
};

export interface Ability {
  id: string;
  name: string;
  type: AbilityType;
  classification: Array<AbilityClassification>;
  tradition?: string;
  requirements: AbilityRequirement;
  effect: AbilityEffect;
  description: string;
  novice?: AbilityClassificationObj;
  adept?: AbilityClassificationObj;
  master?: AbilityClassificationObj;
}

export function meetsRequirements(characterData: any, ability: Ability): boolean {
  const requirements = ability.requirements;

  if (requirements.attribute) {
    const characterAttributeValue = characterData.attributes[requirements.attribute.name.toLowerCase()];
    if (!characterAttributeValue || characterAttributeValue < requirements.attribute.value) {
      return false;
    }
  }

  if (requirements.race) {
    return requirements.race.includes(characterData.race);
  }

  if (requirements.occupation) {
    return requirements.occupation.includes(characterData.occupation);
  }

  if (requirements.abilities) {
    const characterAbilities = characterData.abilities.map((a: any) => a.name);
    if (!requirements.abilities.every(req => characterAbilities.includes(req))) {
      return false;
    }
  }

  if (requirements.corruption && characterData.corruptionThreshold < requirements.corruption) {
    return false;
  }

  return true;
}

export function calculateCorruptionCost(ability: Ability, characterData: any): number {
  if (!ability.effect.corruptionCost) {
    return 0;
  }

  let cost = ability.effect.corruptionCost;

  // Future: Add modifiers based on character traits, items, or other factors
  // that might affect corruption cost

  return Math.max(0, cost);
}

export function getAbilityActionType(classification: AbilityClassificationObj) {
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
