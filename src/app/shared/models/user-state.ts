export interface UserState {
    createdBy: number;
    createdAt: Date | null;
    updatedBy: number | null;
    updatedAt: Date | null;
    id: number;
    userId: string | null; 
    firstName: string | null;
    lastName: string | null;
    password: string | null;
    email: string | null;
    mobileNumber: string | null;
    role: string | null;
    designation: string | null;
    departmetUnit: string | null;
    dateOfBirth: Date | null;
    address: string | null;
    dateOfJoining: Date | null;
    remarks: string | null;
    meta: {
        isLoading: boolean;
        error: string;
    };
}