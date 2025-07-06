import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { USER_ACTIONS, USER_ROLES } from '@app/shared/constants/shared.contants';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { UserDetails } from '@app/shared/models/user-details';
import { HarvestType, MasterGeneric, UnitSector, WorksheetUnit } from '@app/shared/models/master';
import { CreateUserRequest } from '@app/shared/models/create-user';
import { ConfirmationDialogComponent } from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SEVERITY } from '@app/core/core.contants';
import { NotificationService } from '@app/core/services/notification.service';
import { MasterService } from '@master/services/master.service';
import { FORM_CONTROL_NAMES, formConfig, formDetails, MASTER_TITLE } from './master.config';
import { UnitDetails } from '@app/worksheet/models/unit-details';

@Component({
  selector: 'app-master-details',
  standalone: false,
  templateUrl: './master-details.component.html',
  styleUrl: './master-details.component.scss',
})
export class MasterDetailsComponent {
  private unSubscribe = new Subject<void>();
  formConfigData = formConfig;
  formDetails = formDetails;
  userActions = USER_ACTIONS;
  editId: number | null = null;
  tableData: unknown[] = [];
  tableSectorData: unknown[] = [];
  tableHarvestData: unknown[] = [];
  tableWorksheetData: unknown[] = [];
  tableUnitsData: unknown[] = [];
  unitSectors: UnitSector[] = [];
  harvestTypes: HarvestType[] = [];
  worksheetUnits: WorksheetUnit[] = [];
  units: MasterGeneric[] = [];
  userAction = USER_ACTIONS.LIST;
  displayColumnsUser: string[] = [
    'user_code',
    'name',
    'user_role',
    'mobile_number',
    'address',
    'actions',
  ];
  displayColumnsSectors: string[] = [
    'unit_number',
    'unit_name',
    'description',
    'location',
    'actions',
  ];
  displayColumnsHarvest: string[] = ['harvest_number', 'harvest_type', 'description', 'actions'];
  displayColumnsUnits: string[] = ['unit_number', 'unit_value', 'description', 'actions'];
  displayColumnsWorksheet: string[] = [
    'unit_number',
    'unit_name',
    'unit_brand',
    'unit_specs',
    'actions',
  ];
  formTitle = MASTER_TITLE;
  @Input() tabIndex!: number;

  constructor(
    public sharedService: SharedFacadeService,
    private masterService: MasterService,
    private clipboard: Clipboard,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.init();
  }
  public init() {
    this.getUsers();
    this.sharedService.masterData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.unitSectors = data?.unitSectors || [];
        this.tableSectorData = this.unitSectors.map((sector) => ({
          unit_number: sector.id,
          unit_name: sector.name,
          description: sector.description,
          location: sector.location,
        }));
        this.harvestTypes = data?.harvestTypes || [];
        this.tableHarvestData = this.harvestTypes.map((harvest) => ({
          harvest_number: harvest.id,
          harvest_type: harvest.value,
          description: harvest.description,
        }));
        this.worksheetUnits = data?.worksheetUnits || [];
        this.tableWorksheetData = this.worksheetUnits.map((unit) => ({
          unit_number: unit.id,
          unit_name: unit.value,
          unit_brand: unit.brand,
          unit_specs: unit.specs,
        }));
        this.units = data?.units || [];
        this.tableUnitsData = this.units.map((unit) => ({
          unit_number: unit.id,
          unit_value: unit.value,
          description: unit.description,
        }));
        this.formConfigData = this.formConfigData.map((data) => {
          switch (data.name) {
            case FORM_CONTROL_NAMES.UNIT_SECTOR:
              return {
                ...data,
                options: this.unitSectors.map((type) => ({
                  label: `${type.name} (${type.location})`,
                  value: type.id,
                })),
              };
            default:
              return data;
          }
        });
      });

    // Update user details when user is created or updated
    this.sharedService.resetUserUpdated$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((res: boolean) => {
        if (res) {
          this.sharedService.resetUserUpdateStatus();
          this.userAction = USER_ACTIONS.LIST;
          this.editId = null;
          this.getUsers();
        }
      });
  }
  getUsers() {
    this.masterService.getUsers().subscribe((res: any) => {
      this.tableData = res?.data?.data.map((user: UserDetails) => {
        return {
          ...user,
          user_code: user.userCode,
          name: `${user.firstName} ${user.lastName}`,
          user_role: USER_ROLES.filter((role) => role.value === user.role)[0]?.label || 'N/A',
          mobile_number: user.mobileNumber,
        };
      });
    });
  }

  generateUserCode() {
    this.masterService.generateUserCode().subscribe((res: any) => {
      this.formConfigData = this.formConfigData.map((data) => {
        if (data.name === FORM_CONTROL_NAMES.USER_CODE) {
          return { ...data, value: res?.data };
        }
        return data;
      });
    });
  }

  submitFormData(formData: unknown) {
    const payload = formData as CreateUserRequest;
    if (this.userAction === USER_ACTIONS.EDIT) {
      this.sharedService.updateUser({
        ...payload,
        id: this.editId || 0,
        password: undefined, // Password should not be updated on edit
      });
    } else {
      this.sharedService.createUser({
        ...payload,
      });
      this.clipboard.copy(payload.password || '');
      this.notificationService.showMessage(SEVERITY.SUCCESS, 'Password copied to clipboard');
    }
  }

  moveBack() {
    this.userAction = USER_ACTIONS.LIST;
    this.sharedService.resetUserUpdateStatus();
  }

  addNew() {
    this.generateUserCode();
    this.userAction = USER_ACTIONS.ADD;
    this.formDetails = { ...this.formDetails, title: 'Add User' };
  }

  editDetails(event: unknown) {
    const userDetails = event as UserDetails;
    this.editId = userDetails.id;
    this.formConfigData = this.formConfigData.map((data) => {
      if (data.name === FORM_CONTROL_NAMES.UNIT_SECTOR) {
        return {
          ...data,
          value:
            typeof userDetails.unitSectorId === 'object'
              ? userDetails.unitSectorId?.id
              : userDetails.unitSectorId || '',
        };
      }
      return {
        ...data,
        value: userDetails[data.name as keyof UserDetails] || '',
        hide: data.name === FORM_CONTROL_NAMES.PASSWORD ? true : data.hide,
        disabled: data.name === FORM_CONTROL_NAMES.PASSWORD ? true : data.disabled,
      };
    });
    this.userAction = USER_ACTIONS.EDIT;
    this.formDetails = { ...this.formDetails, title: 'Update User' };
  }

  deleteDetails(event: unknown) {
    const userDetails = event as UserDetails;
    const data = {
      title: 'Delete User',
      message: `Are you sure want to delete the user <b>${userDetails.firstName} ${userDetails.lastName}</b>?`,
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });
    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.sharedService.deleteUser(userDetails.id);
      }
    });
  }
}
