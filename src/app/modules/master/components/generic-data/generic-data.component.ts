import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDetails } from '@app/shared/models/user-details';

@Component({
  selector: 'app-generic-data',
  standalone: false,
  templateUrl: './generic-data.component.html',
  styleUrl: './generic-data.component.scss',
})
export class GenericDataComponent {
  @Input() title!: string;
  @Input() data!: UserDetails[];
  @Output() refreshPage = new EventEmitter<void>();
  @Output() addData = new EventEmitter<void>();
  @Output() editData = new EventEmitter<void>();
  @Output() deleteData = new EventEmitter<void>();
  userDisplayColumns = [
    'id',
    'firstName',
    'lastName',
    'mobileNumber',
    'address',
    'role',
    'userCode',
    'actions',
  ];
  onRefresh() {
    this.refreshPage.emit();
  }

  onAdd() {
    this.addData.emit();
  }

  onEditDetails(event: any) {
    console.log('Edit user details:', event);
    // Logic to handle editing user details
    this.editData.emit(event);
  }
  onDeleteDetails(event: any) {
    console.log('Delete user details:', event);
    // Logic to handle deleting user details
    this.deleteData.emit(event);
  }
}
