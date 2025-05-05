import {
  DEFAULT_TANK_TYPE,
  INPUT_TYPES,
  LAYOUT_CLASSES,
} from '@app/shared/constants/shared.contants';
import { FormStructure } from '@app/shared/models/form-structure';

export const FORM_CONTROL_NAMES = {
  TANK_TYPE: 'tankTypeId',
  TANKS: 'tanks',
  HARVEST_HOURS: 'harvestHours',
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
    options: [
      { label: 'Machinery', value: 1 },
      { label: 'Conventional', value: 2 },
    ],
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Tank Type is required',
      },
    ],
  },

  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: 'select',
    label: 'Tanks',
    name: FORM_CONTROL_NAMES.TANKS,
    value: [], //[1],
    isMultiple: true,
    options: [
      { label: 'India', value: 1 },
      { label: 'USA', value: 2 },
      { label: 'Canada', value: 3 },
    ],
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Tank selection is required',
      },
    ],
  },

  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: 'slider',
    label: 'PH',
    name: 'ph',
    value: 7.7,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'PH is required',
      },
    ],
    meta: {
      min: 7.5,
      max: 8.5,
      step: 0.1,
    },
  },
  // salnity
  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: 'slider',
    label: 'Salnity',
    name: 'salnity',
    value: 25,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Salnity is required',
      },
    ],
    meta: {
      min: 23,
      max: 32,
      step: 1,
      unitLabel: 'ppt',
    },
  },
  // Temperature
  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: 'slider',
    label: 'Temperature',
    name: 'temperature',
    value: 30,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Salnity is required',
      },
    ],
    meta: {
      min: 25,
      max: 34,
      step: 1,
      unitLabel: '°C',
    },
  },
  // harvest type
  {
    class: LAYOUT_CLASSES.NONE,
    type: 'select',
    label: 'Harvest Type',
    name: 'harvestTypeId',
    value: 1,
    options: [
      {
        label: 'Instar 1',
        value: 1,
        dependents: { name: FORM_CONTROL_NAMES.HARVEST_HOURS, value: 18 },
      },
      {
        label: 'Instar 2',
        value: 2,
        dependents: { name: FORM_CONTROL_NAMES.HARVEST_HOURS, value: 24 },
      },
      {
        label: 'Manual',
        value: 3,
        dependents: { name: FORM_CONTROL_NAMES.HARVEST_HOURS, value: 0 },
      },
    ],
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
    value: 1,
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
  // harvest type
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

  // harvest hours
  {
    class: LAYOUT_CLASSES.NONE,
    type: 'select',
    label: 'Input in Unit(s)',
    name: 'inputUnitId',
    value: 1,
    options: [
      { label: 'India', value: 1 },
      { label: 'USA', value: 2 },
      { label: 'Canada', value: 3 },
    ],
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Unit selection is required',
      },
    ],
  },
  // Assigned User
  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: 'select',
    label: 'User',
    name: 'userId',
    value: 1,
    options: [
      { label: 'India', value: 1 },
      { label: 'USA', value: 2 },
      { label: 'Canada', value: 3 },
    ],
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'User selection is required',
      },
    ],
  },
];
