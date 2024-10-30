export interface Calification {
    id: number;                 
    score: number;            
    comment?: string;            
    date: string;                 
    userId: number;              
    targetUserId: number;      
    propertyId?: number;        
    ratingType: 'TENANT_TO_LANDLORD' | 'LANDLORD_TO_TENANT' | 'TENANT_TO_PROPERTY'; 
}

  