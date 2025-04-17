import { FormStructure } from '../../models/form-structure';

export const formConfig: FormStructure[] = [
  {
    rows: 1,
    cols: 1,
    type: 'text',
    label: 'Name',
    name: 'name',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Name is required',
      },
    ],
  },
  {
    rows: 1,
    cols: 1,
    type: 'textarea',
    label: 'Description',
    name: 'description',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Description is required',
      },
    ],
  },
  {
    rows: 1,
    cols: 1,
    type: 'number',
    label: 'Age',
    name: 'age',
    value: '',
    validations: [],
  },
  {
    rows: 1,
    cols: 1,
    type: 'radio',
    label: 'Gender',
    name: 'gender',
    value: true,
    options: [
      { label: 'Male', value: true },
      { label: 'Female', value: false },
    ],
    validations: [],
  },
  {
    rows: 1,
    cols: 1,
    type: 'select',
    label: 'Country',
    name: 'country',
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
        message: 'Address is required',
      },
    ],
  },
];
