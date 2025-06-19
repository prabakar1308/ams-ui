export interface CreateUserRequest {
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  mobileNumber?: string;
  role?: string;
  designation?: string;
  unitSectorId?: string;
  dateOfBirth?: Date;
  address?: string;
  dateOfJoining?: Date;
  remarks?: string;
  userCode?: string;
}
