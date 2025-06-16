import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserDetails } from '@app/shared/models/user-details';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { SharedService } from '@app/shared/service/shared-service';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { UnitSector, UserRole } from '@app/shared/models/master';

@Component({
  selector: 'app-master-home',
  standalone: false,
  templateUrl: './master-home.component.html',
  styleUrl: './master-home.component.scss',
})
export class MasterHomeComponent implements OnInit {
  userDetails: UserDetails[] = []; // Replace 'any' with the appropriate type if known
  currentTabIndex = 0;
  unitSectors: UnitSector[] = []; // Replace 'any' with the appropriate type if known
  readonly dialog = inject(MatDialog);

  constructor(
    private masterService: MasterService,
    private sharedService: SharedFacadeService,
  ) {}

  ngOnInit() {
    this.getUsers();
    this.sharedService.getMasterData();
    this.sharedService.masterData$.subscribe((data) => {
      this.unitSectors = data?.unitSectors || [];
      console.log('Unit Sectors:', this.unitSectors);
    });
  }

  getUsers() {
    this.masterService.getUsers().subscribe((res: any) => {
      this.userDetails = res?.data?.data;
    });
  }
  loadData(event: any) {
    this.currentTabIndex = event.index;
    if (this.currentTabIndex === 0) {
      this.getUsers();
    }
    console.log('Load data event:', event);
  }

  addNew() {
    switch (this.currentTabIndex) {
      case 0:
        // Logic to add a new user
        let userCode = this.userDetails.length + 1; // Example logic to generate a user code
        let newUser: UserDetails = {
          id: 0, // Assuming 'id' is a required field, set it to 0 for a new user
          firstName: '',
          lastName: '',
          mobileNumber: '',
          address: '',
          role: '',
          userCode: 'GMS-AMH-' + userCode,
          password: '',
          email: '',
          designation: '',
          unitSectorId: '',
          dateOfBirth: new Date(),
          dateOfJoining: new Date(),
          remarks: '',
        };
        const roleData = [
          {
            id: 1,
            name: UserRole.ADMIN,
          },
          {
            id: 2,
            name: UserRole.USER,
          },
          {
            id: 3,
            name: UserRole.FM_USER,
          },
        ];
        const dataFields: FieldData[] = [
          { title: 'User Code', type: 'disabled', name: 'userCode', options: [] },
          { title: 'First Name', type: 'text', name: 'firstName', options: [] },
          { title: 'Last Name', type: 'text', name: 'lastName', options: [] },
          { title: 'Mobile Number', type: 'mobile', name: 'mobileNumber', options: [] },
          { title: 'Address', type: 'text', name: 'address', options: [] },
          { title: 'Role', type: 'select', name: 'role', options: roleData },
          { title: 'Password', type: 'text', name: 'password', options: [] },
          { title: 'Email', type: 'text', name: 'email', options: [] },
          { title: 'Designation', type: 'text', name: 'designation', options: [] },
          {
            title: 'Department/Unit',
            type: 'select',
            name: 'unitSectorId',
            options: this.unitSectors,
          },
          { title: 'Date of Birth', type: 'date', name: 'dateOfBirth', options: [] },
          { title: 'Date of Joining', type: 'date', name: 'dateOfJoining', options: [] },
          { title: 'Remarks', type: 'text', name: 'remarks', options: [] },
        ];
        const data = {
          formData: newUser,
          isEdit: false,
          title: 'Add User',
          fields: dataFields,
          tab: this.currentTabIndex,
        };
        const dialogRef = this.dialog.open(UserDetailsComponent, {
          data,
          width: '1200px',
          maxWidth: '100%',
        });

        dialogRef.afterClosed().subscribe((result) => {
          this.getUsers();
          console.log(`Dialog result: ${result}`);
        });
        break;
    }
  }

  editDetails(event: any) {
    switch (this.currentTabIndex) {
      case 0:
        // Logic to add a new user

        const roleData = [
          {
            id: 1,
            name: UserRole.ADMIN,
          },
          {
            id: 2,
            name: UserRole.USER,
          },
          {
            id: 3,
            name: UserRole.FM_USER,
          },
        ];
        const dataFields: FieldData[] = [
          { title: 'User Code', type: 'disabled', name: 'userCode', options: [] },
          { title: 'First Name', type: 'text', name: 'firstName', options: [] },
          { title: 'Last Name', type: 'text', name: 'lastName', options: [] },
          { title: 'Mobile Number', type: 'mobile', name: 'mobileNumber', options: [] },
          { title: 'Address', type: 'text', name: 'address', options: [] },
          { title: 'Role', type: 'select', name: 'role', options: roleData },
          { title: 'Password', type: 'text', name: 'password', options: [] },
          { title: 'Email', type: 'text', name: 'email', options: [] },
          { title: 'Designation', type: 'text', name: 'designation', options: [] },
          {
            title: 'Department/Unit',
            type: 'select',
            name: 'unitSectorId',
            options: this.unitSectors,
          },
          { title: 'Date of Birth', type: 'date', name: 'dateOfBirth', options: [] },
          { title: 'Date of Joining', type: 'date', name: 'dateOfJoining', options: [] },
          { title: 'Remarks', type: 'text', name: 'remarks', options: [] },
        ];
        const data = {
          formData: event,
          isEdit: true,
          title: 'Edit User',
          fields: dataFields,
          tab: this.currentTabIndex,
        };
        const dialogRef = this.dialog.open(UserDetailsComponent, {
          data,
          width: '1200px',
          maxWidth: '100%',
        });

        dialogRef.afterClosed().subscribe((result) => {
          this.getUsers();
          console.log(`Dialog result: ${result}`);
        });
        break;
    }
  }

  deleteDetails(event: any) {
    switch (this.currentTabIndex) {
      case 0:
        this.sharedService.deleteUser(event.id);
        console.log('Delete user details:', event);
        break;
    }
  }
}

export class FieldData {
  title!: string;
  type!: string;
  name!: string | number | boolean;
  options!: any[]; // Assuming options is an array of any type, adjust as necessary
}
