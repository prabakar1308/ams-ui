export interface GenericForm {
  container: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface GenericOption {
  label: string;
  value?: unknown;
  disabled?: boolean;
  dependents?: Depedent[];
  hide?: string[];
  show?: string[];
  tooltip?: string;
}

export interface Depedent {
  name: string;
  value: unknown;
  askReset?: boolean;
  // for validation
  validations?: {
    name?: string;
    validator: string;
    message?: string;
  }[];
}

export interface FormDetails {
  label: string;
  value: string;
}
