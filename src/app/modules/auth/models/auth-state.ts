export interface AuthState {
  isAuthenticated: boolean;
  userRole: string;
  userName: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  userCode: string;
  meta: {
    isLoading: boolean;
    error: string;
  };
}
