import { INPUT_TYPES, LAYOUT_CLASSES, USER_ROLES } from '@app/shared/constants/shared.contants';
import { FormStructure } from '@app/shared/models/form-structure';

export const FORM_CONTROL_NAMES = {
  USER_CODE: 'userCode',
  PASSWORD: 'password',
  ROLE: 'role',
  UNIT_SECTOR: 'unitSectorId',
};

export const formDetails = {
  container: LAYOUT_CLASSES.CONTAINER,
  title: 'User Details',
  description: '',
  tags: [],
};

export const formConfig: FormStructure[] = [
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'User Code',
    name: FORM_CONTROL_NAMES.USER_CODE,
    value: '',
    disabled: true,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'User Code is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'First Name',
    name: 'firstName',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'First Name is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'Last Name',
    name: 'lastName',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Last Name is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'Mobile Number',
    name: 'mobileNumber',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Mobile Number is required',
      },
    ],
  },

  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'Address',
    name: 'address',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Address is required',
      },
    ],
  },

  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.SELECT,
    label: 'Role',
    name: FORM_CONTROL_NAMES.ROLE,
    value: [], //[1],
    isMultiple: false,
    options: USER_ROLES,
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Role selection is required',
      },
    ],
  },

  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'Password',
    name: 'password',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Password is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'Email',
    name: 'email',
    value: '',
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXT,
    label: 'Designation',
    name: 'designation',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Designation is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.SELECT,
    label: 'Unit/Department',
    name: FORM_CONTROL_NAMES.UNIT_SECTOR,
    value: [], //[1],
    isMultiple: false,
    options: [],
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'Role selection is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.DATE,
    label: 'Date of Birth',
    name: 'dateOfBirth',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'DOB is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.DATE,
    label: 'Date of Joining',
    name: 'dateOfJoining',
    value: '',
    validations: [
      {
        name: 'required',
        validator: 'required',
        message: 'DOJ is required',
      },
    ],
  },
  {
    class: LAYOUT_CLASSES.NONE,
    type: INPUT_TYPES.TEXTAREA,
    label: 'Remarks',
    name: 'remarks',
    value: '',
  },
];
