import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { Clipboard } from '@angular/cdk/clipboard';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { USER_ACTIONS, USER_ROLES } from '@app/shared/constants/shared.contants';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { UserDetails } from '@app/shared/models/user-details';
import { UnitSector } from '@app/shared/models/master';
import { CreateUserRequest } from '@app/shared/models/create-user';
import { ConfirmationDialogComponent } from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';
// import { SEVERITY } from '@app/core/core.contants';
// import { NotificationService } from '@app/core/services/notification.service';
import { MasterService } from '@master/services/master.service';
import { FORM_CONTROL_NAMES, formConfig, formDetails } from './user.config';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailsComponent {
  private unSubscribe = new Subject<void>();
  formConfigData = [...formConfig];
  formDetails = formDetails;
  userActions = USER_ACTIONS;
  editId: number | null = null;
  tableData: unknown[] = [];
  unitSectors: UnitSector[] = [];
  userAction = USER_ACTIONS.LIST;
  displayColumns = ['name', 'user_code', 'user_role', 'mobile_number', 'address', 'actions'];

  constructor(
    public sharedService: SharedFacadeService,
    private masterService: MasterService,
    // private clipboard: Clipboard,
    // private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getUsers();
    this.sharedService.masterData$
      .pipe(takeUntil(this.unSubscribe), distinctUntilChanged())
      .subscribe((data) => {
        this.unitSectors = data?.unitSectors || [];
        this.initializeFormConfig();
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

  initializeFormConfig() {
    this.formConfigData = [...formConfig];
  }

  getUsers() {
    this.masterService.getUsers().subscribe((res: any) => {
      this.tableData = res?.data?.data.map((user: UserDetails) => {
        return {
          ...user,
          user_code: user.userCode,
          name: `${user.firstName} ${user.lastName}`,
          user_role:
            USER_ROLES.filter((role) => role.value === user.role)[0]?.label || 'Super Admin',
          mobile_number: user.mobileNumber,
          enableEdit: user.role !== 'super_admin',
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
        password: 'welcome123', // Default password for new users
      });
      // this.clipboard.copy(payload.password || '');
      // this.notificationService.showMessage(SEVERITY.SUCCESS, 'Password copied to clipboard');
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
