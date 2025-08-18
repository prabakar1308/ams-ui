import { ProductionItem } from '../models/dashboard';

export const PRODUCTION_ITEMS_ID = {
  LIVE_ARTEMIA: 1,
  FROZEN_CUPS: 2,
  RESTOCK: 3,
  MACHINERY: 4,
  CONVENTIONAL: 5,
};

export const PRODUCTION_ITEMS: ProductionItem[] = [
  {
    id: 1,
    icon: 'live_tv',
    title: 'Live Artemia',
    values: [],
    class: 'bg-[#eff3ee]',
  },
  {
    id: 2,
    icon: 'emoji_food_beverage',
    title: 'Cold Storage',
    values: [],
  },
  {
    id: 3,
    icon: 'shopping_cart_checkout',
    title: 'Restock',
    values: [],
    description: 'Set of active and in-use restock volumes',
  },
  {
    id: 4,
    icon: 'delete_sweep',
    title: 'Machinery',
    values: [],
    description: 'Set of volumes currently in culture',
  },
  {
    id: 5,
    icon: 'view_timeline',
    title: 'Conventional',
    values: [],
    description: 'Set of volumes currently in culture',
  },
];
