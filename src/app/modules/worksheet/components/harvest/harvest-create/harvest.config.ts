import { INPUT_TYPES, LAYOUT_CLASSES } from '@app/shared/constants/shared.contants';
import { FormStructure } from '@app/shared/models/form-structure';

export const FORM_CONTROL_NAMES = {
  COUNT: 'count',
  UNIT_ID: 'unitId',
  MEASURED_BY: 'measuredBy',
  RESTOCK_COUNT: 'restockCount',
  GENERATED_AT: 'generatedAt',
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
    name: FORM_CONTROL_NAMES.COUNT,
    value: 0,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Count is required',
        value: 0,
      },
    ],
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
    name: FORM_CONTROL_NAMES.RESTOCK_COUNT,
    value: 0,
    meta: {
      hint: 'Add restock count in millions',
    },
  },
  {
    class: LAYOUT_CLASSES.DEFAULT,
    type: INPUT_TYPES.DATETIME,
    label: 'Created At',
    name: 'generatedAt',
    value: null,
  },
];
