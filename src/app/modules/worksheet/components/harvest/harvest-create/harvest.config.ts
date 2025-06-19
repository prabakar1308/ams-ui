import {
  DEFAULT_TANK_TYPE,
  INPUT_TYPES,
  LAYOUT_CLASSES,
} from '@app/shared/constants/shared.contants';
import { FormStructure } from '@app/shared/models/form-structure';

export const FORM_CONTROL_NAMES = {
  // TANK_TYPE: 'tankTypeId',
  // TANKS: 'tanks',
  // HARVEST_TYPE: 'harvestTypeId',
  // HARVEST_HOURS: 'harvestHours',
  // RESTOCK: 'restocks',
  // INPUT_COUNT: 'inputCount',
  UNIT_ID: 'unitId',
  MEASURED_BY: 'measuredBy',
  // UNIT_SECTOR_ID: 'unitSectorId',
  // TRANSIT_COUNT: 'transitCount',
  // DIVIDER: 'divider',
};

export const formDetails = {
  container: LAYOUT_CLASSES.CONTAINER,
  title: 'Create Harvest',
  description: 'Please fill up the details to complete the harvest',
  tags: [] as string[],
};

export const formConfig: FormStructure[] = [
  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: INPUT_TYPES.NUMBER,
    label: 'Count',
    name: 'count',
    value: 0,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Count is required',
      },
    ],
    // dependents: [
    //   {
    //     name: FORM_CONTROL_NAMES.TRANSIT_COUNT,
    //     value: 0,
    //     validations: [
    //       {
    //         validator: 'max',
    //       },
    //     ],
    //   },
    // ],
  },
  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: INPUT_TYPES.SELECT,
    label: 'Count in Unit(s)',
    name: FORM_CONTROL_NAMES.UNIT_ID,
    value: 0,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Unit selection is required',
      },
    ],
  },

  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: 'select',
    label: 'Measured By',
    name: FORM_CONTROL_NAMES.MEASURED_BY,
    value: 0,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'User selection is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: INPUT_TYPES.TEXT,
    label: 'Restock Count',
    name: 'restockCount',
    value: 0,
    meta: {
      hint: 'Add restock count in millions',
    },
  },

  // {
  //   class: LAYOUT_CLASSES.FULL_WIDTH,
  //   type: INPUT_TYPES.DIVIDER,
  //   label: 'Transit Details',
  //   name: FORM_CONTROL_NAMES.DIVIDER,
  //   value: 0,
  // },

  // {
  //   class: LAYOUT_CLASSES.DEFAULT,
  //   type: INPUT_TYPES.NUMBER,
  //   label: 'Transit Count',
  //   name: FORM_CONTROL_NAMES.TRANSIT_COUNT,
  //   value: 0,
  //   errorMessages: {
  //     max: 'Transit count should be less than or equal to count',
  //   },

  //   dependents: [
  //     {
  //       name: FORM_CONTROL_NAMES.UNIT_SECTOR_ID,
  //       value: 0,
  //       validations: [
  //         {
  //           validator: 'required',
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   class: LAYOUT_CLASSES.DEFAULT,
  //   type: INPUT_TYPES.SELECT,
  //   label: 'Unit Sectors',
  //   name: FORM_CONTROL_NAMES.UNIT_SECTOR_ID,
  //   options: [],
  //   value: 0,
  //   errorMessages: {
  //     required: 'Unit sector is required',
  //   },
  // },
];
