import { Income } from './income.enum';

export interface Property {
    id?: number;
    name: string;
    location: string;
    description: string;
    photoUrl: string;
    department: string;
    municipality: string;
    incomeType: Income;
    rooms: number;
    bathrooms: number;
    allowsPets: boolean;
    hasPool: boolean;
    hasBBQ: boolean;
    nightlyRate: number;
    ownerId: number; 
  }
  