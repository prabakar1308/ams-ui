import { INPUT_TYPES, LAYOUT_CLASSES } from '@app/shared/constants/shared.contants';
import { FormStructure } from '@app/shared/models/form-structure';

export const formWsDetails = {
  container: LAYOUT_CLASSES.CONTAINER,
  title: 'Worksheet Unit Details',
  description: '',
  tags: [],
};

export const formWsConfig: FormStructure[] = [
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'Value Name',
    name: 'value',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Value Name is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'Brand Name',
    name: 'brand',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Brand Name is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'Specification',
    name: 'specs',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Specification Name is required',
      },
    ],
  },
];
