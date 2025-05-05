export interface GenericForm {
  container: string;
  title: string;
  description: string;
}

export interface GenericOption {
  label: string;
  value?: unknown;
  dependents?: { name: string; value: unknown };
}
