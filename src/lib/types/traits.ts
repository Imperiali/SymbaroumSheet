export type TraitType = 'Trait' | 'Gift' | 'Burden';

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
}
