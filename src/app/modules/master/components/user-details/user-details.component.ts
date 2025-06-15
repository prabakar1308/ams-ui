import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { USER_ROLES } from '@app/shared/constants/shared.contants';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    public sharedService: SharedFacadeService,
  ) {}

  saveDetails() {
    switch (this.data.tab) {
      case 0:
        let role =
          this.data.formData.role === 1
            ? USER_ROLES.ADMIN
            : this.data.formData.role === 2
              ? USER_ROLES.USER
              : USER_ROLES.FM_USER;
        if (!this.data.isEdit) {
          this.sharedService.createUser({
            address: this.data.formData.address,
            firstName: this.data.formData.firstName,
            lastName: this.data.formData.lastName,
            mobileNumber: this.data.formData.mobileNumber,
            role: role,
            userCode: this.data.formData.userCode,
            dateOfBirth: this.data.formData.dateOfBirth,
            dateOfJoining: this.data.formData.dateOfJoining,
            designation: this.data.formData.designation,
            email: this.data.formData.email,
            password: this.data.formData.password,
            remarks: this.data.formData.remarks,
            unitSectorId: this.data.formData.unitSectorId,
          });
        } else {
          this.sharedService.updateUser({
            id: this.data.formData.id,
            firstName: this.data.formData.firstName,
            lastName: this.data.formData.lastName,
          });
        }
        this.dialogRef.close();
        console.log('User details saved:', this.data);
        break;
    }
  }
}
