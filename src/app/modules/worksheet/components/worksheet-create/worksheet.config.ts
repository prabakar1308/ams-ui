import {
  DEFAULT_TANK_TYPE,
  INPUT_TYPES,
  LAYOUT_CLASSES,
} from '@app/shared/constants/shared.contants';
import { FormStructure } from '@app/shared/models/form-structure';

export const FORM_CONTROL_NAMES = {
  TANK_TYPE: 'tankTypeId',
  TANKS: 'tanks',
  HARVEST_TYPE: 'harvestTypeId',
  HARVEST_HOURS: 'harvestHours',
  RESTOCK: 'restocks',
  INPUT_COUNT: 'inputCount',
  INPUT_UNIT_ID: 'inputUnitId',
  USER_ID: 'userId',
  PH: 'ph',
  SALNITY: 'salnity',
  TEMPERATURE: 'temperature',
};

export const formDetails = {
  container: LAYOUT_CLASSES.CONTAINER,
  title: 'Create Worksheet',
  description: 'Please fill up the tank parameters to create the worksheet',
};

export const formConfig: FormStructure[] = [
  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: INPUT_TYPES.BUTTON_TOGGLE,
    label: 'Tank Type',
    name: FORM_CONTROL_NAMES.TANK_TYPE,
    value: DEFAULT_TANK_TYPE,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Tank Type is required',
      },
    ],
    callback: true,
  },

  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: 'select',
    label: 'Tanks',
    name: FORM_CONTROL_NAMES.TANKS,
    value: [], //[1],
    isMultiple: true,
    options: [],
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Tank selection is required',
      },
    ],
    meta: {
      hint: 'tanks selected.',
    },
  },

  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: 'slider',
    label: 'PH',
    name: 'ph',
    value: 0,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'PH is required',
      },
    ],
  },
  // salnity
  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: 'slider',
    label: 'Salnity',
    name: 'salnity',
    value: 0,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Salnity is required',
      },
    ],
  },
  // Temperature
  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: 'slider',
    label: 'Temperature',
    name: 'temperature',
    value: 0,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Salnity is required',
      },
    ],
  },
  // harvest type
  {
    class: LAYOUT_CLASSES.NONE,
    type: 'select',
    label: 'Harvest Type',
    name: 'harvestTypeId',
    value: 0,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Harvest Type selection is required',
      },
    ],
  },

  // harvest hours
  {
    class: LAYOUT_CLASSES.NONE,
    type: 'number',
    label: 'Harvest Hours',
    name: 'harvestHours',
    value: 0,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Harvest Hours is required',
      },
      {
        name: 'min',
        validator: 'min',
        value: 1,
        message: 'Harvest Hours should be greater than 0',
      },
      {
        name: 'max',
        validator: 'max',
        value: 24,
        message: 'Harvest Hours should be less than or equal to 24',
      },
    ],
  },
  // Input Count
  {
    class: LAYOUT_CLASSES.NONE,
    type: 'number',
    label: 'Input Count',
    name: 'inputCount',
    value: 1,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Input count is required',
      },
    ],
  },

  // Input Unit
  {
    class: LAYOUT_CLASSES.NONE,
    type: 'select',
    label: 'Input in Unit(s)',
    name: 'inputUnitId',
    value: 0,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Unit selection is required',
      },
    ],
  },
  // Restock
  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: 'select',
    label: 'Restock',
    name: FORM_CONTROL_NAMES.RESTOCK,
    value: [],
    isMultiple: true,
    options: [],
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Restock selection is required',
      },
    ],
    hide: true,
  },
  // Assigned User
  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: 'select',
    label: 'User',
    name: 'userId',
    value: 0,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'User selection is required',
      },
    ],
  },
];
