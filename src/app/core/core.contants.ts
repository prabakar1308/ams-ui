export enum SEVERITY {
  SUCCESS,
  INFO,
  WARN,
  ERROR,
}

export class CORE_CONSTANTS {
  public static readonly TOASTER_LIVE_TIME: number = 3000;
}

export const NAVBAR_ITEMS = [
  { name: 'Dashboard', route: '/dashboard' },
  { name: 'Monitoring', route: '/worksheet' },
  { name: 'Master', route: '/master' },
  { name: 'Reports', route: '/reports' },
];

export const USER_NAVBAR_ITEMS = [
  { name: 'Dashboard', route: '/dashboard' },
  { name: 'Monitoring', route: '/worksheet' },
];

export const FM_USER_NAVBAR_ITEMS = [
  { name: 'Dashboard', route: '/dashboard' },
  { name: 'Reports', route: '/reports' },
];

export const FM_USER = 'fm_user';
export const USER = 'user';
export const ADMIN = 'admin';
