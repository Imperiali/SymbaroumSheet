export type TraitType = 'Trait' | 'Boon' | 'Burden';

export type TraitClassification = 'N' | 'A' | 'M';


export type TraitEffect = {
  description: string;
};

export interface Trait {
  id: string;
  name: string;
  type: TraitType;
  classification: Array<TraitClassification>;
  description: string;
  novice?: {
    description: string;
    action: string;
  };
  adept?: {
    description: string;
    action: string;
  };
  master?: {
    description: string;
    action: string;
  }
}
