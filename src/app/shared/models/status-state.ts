export interface StatusState {
    id: number;
    value: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    createdBy: number;
    updatedBy: number;
    meta: {
        isLoading: boolean;
        error: string;
      };
}