export type TraitType = 'Trait' | 'Boon' | 'Burden';

export type TraitActionType =  'Reaction' | 'Special' | 'Active' | 'Passive' | 'Free' | 'Full turn';

export type TraitClassification = 'N' | 'A' | 'M';


export type TraitEffect = {
  description: string;
};

export interface Trait {
  id: string;
  name: string;
  type: TraitType;
  classification?: Array<TraitClassification>;
  description: string;
  novice?: {
    description: string;
    action: TraitActionType;
  };
  adept?: {
    description: string;
    action: TraitActionType;
  };
  master?: {
    description: string;
    action: TraitActionType;
  }
}
