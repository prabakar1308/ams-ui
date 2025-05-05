import { GenericOption } from './generic-form';

export interface FormStructure {
  rows?: number;
  cols?: number;
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
}

export interface FormValidation {
  name: string;
  validator: string;
  message: string;
  pattern?: string | RegExp;
  value?: number;
}

export interface Meta {
  min: number;
  max: number;
  step: number;
  unitLabel?: string;
}
