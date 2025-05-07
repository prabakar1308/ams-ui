export interface GenericForm {
  container: string;
  title: string;
  description: string;
}

export interface GenericOption {
  label: string;
  value?: unknown;
  disabled?: boolean;
  dependents?: { name: string; value: unknown; askReset?: boolean };
}
