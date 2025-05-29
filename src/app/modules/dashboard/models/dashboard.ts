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
  class: string;
}
