import { HarvestTypeDetails } from "../../../shared/models/harvestType-details";
import { StatusDetails } from "../../../shared/models/status-details";
import { TankTypeDetails } from "../../../shared/models/tankType-details";
import { UserDetails } from "../../../shared/models/user-details";

export interface WorksheetDetails{
    createdBy: number | null;
    updatedBy: number | null;
    id: number;
    status: StatusDetails | null;
    ph: string | null;
    salnity: number | null;
    temperature: number | null;
    tankType: TankTypeDetails | null;
    tankNumber: number | null;
    harvestType: HarvestTypeDetails | null;
    harvestTime: Date | null;
    inputSource: string | null;
    inputCount: number | null;
    sourceUnitName: string | null;
    user: UserDetails | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
    userId: string;
}