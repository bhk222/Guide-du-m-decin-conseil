
export interface Injury {
  name: string;
  rate: number | [number, number];
  description?: string;
  imageUrl?: string; // URL de l'image explicative médicale
  rateCriteria?: {
    low: string;
    medium?: string;
    high: string;
  }
  excludeContext?: string[]; // Mots-clés pour exclure cette lésion dans certains contextes
}

export interface InjurySubcategory {
  name:string;
  injuries: Injury[];
}

export interface InjuryCategory {
  name: string;
  subcategories: InjurySubcategory[];
}

export interface SelectedInjury extends Injury {
  id: string;
  chosenRate: number;
  category?: string;
  rateRange?: string;
  justification?: string;
  socialRate?: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  choices?: (Injury & { context?: 'clarification' | 'rate_choice', originalInjury?: Injury })[];
}

export interface ProfessionalDisease {
  tableau: string;
  name: string;
  description: string;
  delay: string;
  workList: string;
}

export interface DiseaseCategory {
    name: string;
    diseases: ProfessionalDisease[];
}

export interface Drug {
  name?: string;
  dci: string;
  dosage?: string;
  classe_therapeutique?: string;
  indications?: string[];
  posologie?: string[];
  contre_indications?: string[];
  interactions?: string[];
  remboursement?: string;
  // FIX: Added optional 'conditionnement' property to match data in drugList.ts
  conditionnement?: string;
}

export interface Appareillage {
  reference: string;
  nom: string;
  categorie: string;
  type?: string;
  remboursement?: string;
  description: string;
  indications: string[];
  criteres_conformite?: string[];
  adjonctions?: string[];
  references_composees?: string[];
}

export interface AISearchResult {
  reference: string;
  nom: string;
  description: string;
  indications: string[];
  criteres_conformite: string[];
  confidence: number;
  source: string;
}