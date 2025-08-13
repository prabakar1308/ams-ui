import { UnitSector } from './master';

export interface UserDetails {
  id: number;
  userId?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  mobileNumber?: string;
  role?: string;
  designation?: string;
  unitSectorId?: number | UnitSector;
  dateOfBirth?: Date;
  address?: string;
  dateOfJoining?: Date;
  remarks?: string;
  userCode?: string;
}

export interface ResetUserPassword {
  userId: string;
  newPassword: string;
}
