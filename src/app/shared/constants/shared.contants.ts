export const INPUT_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  NUMBER: 'number',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
  DATE: 'date',
  TIME: 'time',
  FILE: 'file',
};

export const TEXT_INPUT_TYPES = [
  INPUT_TYPES.TEXT,
  INPUT_TYPES.TEXTAREA,
  INPUT_TYPES.NUMBER,
  INPUT_TYPES.DATE,
  INPUT_TYPES.TIME,
  INPUT_TYPES.FILE,
];

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  FM_USER: 'fm_user',
};

export const CUSTOM_PRESETS = [
  'Today',
  'Yesterday and today',
  'Yesterday',
  'Last 7 days',
  'Last 30 days',
  'This month',
  'Previous month',
  'Custom',
];

export const DEFAULT_TANK_TYPE = 1; // MACHINERY

export const WORKSHEET_STATUS = {
  READY_FOR_STOCKING: 1,
  IN_STOCKING: 2,
  READY_FOR_HARVEST: 3,
  COMPLETED: 4,
  FREE: 5,
};
