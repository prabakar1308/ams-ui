import { HarvestDetails } from "./harvest-details";

export interface HarvestState {
    activeHarvestList: HarvestDetails[];
    meta: {
        isLoading: boolean;
        error: string;
    };
}