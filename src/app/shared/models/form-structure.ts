import { GenericOption } from './generic-form';

export interface FormStructure {
  class?: string;
  type: string;
  label: string;
  name: string;
  disabled?: boolean;
  isMultiple?: boolean;
  value: unknown;
  options?: GenericOption[];
  validations?: FormValidation[];
  meta?: Meta;
  //set it as true to retain the previous value, if option has dependents with askReset as true
  callback?: boolean;
  hide?: boolean;
}

export interface FormValidation {
  name: string;
  validator: string;
  message: string;
  pattern?: string | RegExp;
  value?: number;
}

export interface Meta {
  min?: number;
  max?: number;
  step?: number;
  unitLabel?: string;
  hint?: string;
}
