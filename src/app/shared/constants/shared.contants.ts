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
  BUTTON_TOGGLE: 'button_toggle',
  SLIDER: 'slider',
  DIVIDER: 'divider',
};

export const LAYOUT_CLASSES = {
  CONTAINER: 'grid md:grid-cols-4 sm:grid-cols-1 gap-5 md:gap-8 md:gap-x-10',
  // Form layout is by default considered as 1 column for mobile and 4 columns for other
  // mobile - 1/1, other - 1/4
  NONE: 'sm:col-span-1 md:col-span-2 lg:col-span-1',
  // mobile - 1/1, other - 2/4
  DEFAULT: 'sm:col-span-1 md:col-span-2',
  // mobile - 1/1, other - 4/4
  FULL_WIDTH: 'sm:col-span-1 md:col-span-4',
};

export const TEXT_INPUT_TYPES = [
  INPUT_TYPES.TEXT,
  INPUT_TYPES.TEXTAREA,
  INPUT_TYPES.NUMBER,
  INPUT_TYPES.TIME,
  INPUT_TYPES.FILE,
];

export const USER_ROLES = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'user',
    label: 'User',
  },
  {
    value: 'fm_user',
    label: 'FM User',
  },
];

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

export const USER_ACTIONS = {
  LIST: 'LIST',
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  VIEW: 'VIEW',
};

export const DEFAULT_TANK_TYPE = 1; // MACHINERY

export const TANK_TYPES = {
  MACHINERY: 1,
  CONVENTIONAL: 2,
};

export const UNIT_IDS = {
  MILLIONS: 1,
  FROZEN_CUPS: 2,
  TINS: 3,
  BAGS: 4,
};

export const WORKSHEET_STATUS = {
  READY_FOR_STOCKING: 1,
  IN_STOCKING: 2,
  READY_FOR_HARVEST: 3,
  COMPLETED: 4,
  FREE: 5,
};

export const WORKSHEET_TABLE_STATUS = {
  ACTIVE: 'A',
  COMPLETED: 'D',
  IN_USE: 'U',
};

export const WORKSHEET_UPDATE_ACTION = {
  ASSIGNEE: 'WORKSHEET_ASSIGNEE_UPDATED',
  STATUS: 'WORKSHEET_STATUS_UPDATED',
  ASSIGNEE_STATUS: 'WORKSHEET_STATUS_ASSIGNEE_UPDATED',
};

export const WORKSHEET_OUTPUT_UNITS = [UNIT_IDS.MILLIONS, UNIT_IDS.FROZEN_CUPS];
