import { ADMIN } from '@app/core/core.contants';
import { INPUT_TYPES, LAYOUT_CLASSES, USER_ROLES } from '@app/shared/constants/shared.contants';
import { FormStructure } from '@app/shared/models/form-structure';

export const formSTDetails = {
  container: LAYOUT_CLASSES.CONTAINER,
  title: 'Source Tracker Details',
  description: '',
  tags: [],
};
export const formSTConfig: FormStructure[] = [
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'Source Origin',
    name: 'sourceOrigin',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Source Origin is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'Total Count',
    name: 'count',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Total count is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.SELECT,
    label: 'Unit Source',
    name: 'unitSource',
    value: 'ADMIN', //need to workout,
    isMultiple: false,
    options: USER_ROLES,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Unit source is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.DATE,
    label: 'Generated Date',
    name: 'generatedAt',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Generated Date is required',
      },
    ],
  },
];
