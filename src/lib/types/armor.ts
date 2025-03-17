export interface Armor {
  id?: string;
  name: string;
  protection: string | number;
  quality?: string;
  qualities?: string[];
  type?: string;
  cost?: number;
}
