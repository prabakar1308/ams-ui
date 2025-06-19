export interface ProductionItem {
  id: number;
  icon: string;
  title: string;
  values: ProductionItemValue[];
  class?: string;
}

export interface ProductionItemValue {
  count: number;
  unit?: string;
  link: string;
  queryParams?: { [key: string]: string };
  click?: number;
  class: string;
}
