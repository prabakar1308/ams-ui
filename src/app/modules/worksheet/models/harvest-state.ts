import { HarvestDetails } from './harvest-details';

export interface HarvestState {
  activeHarvestData: HarvestDetails[];
  meta: {
    isLoading: boolean;
    error: string;
  };
}
