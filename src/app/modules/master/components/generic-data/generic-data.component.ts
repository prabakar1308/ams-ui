import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-data',
  standalone: false,
  templateUrl: './generic-data.component.html',
  styleUrl: './generic-data.component.scss',
})
export class GenericDataComponent {
  @Input() title!: string;
  @Input() data!: unknown[];
  @Input() displayColumns!: string[];
  @Input() sticky = '';
  @Input() showSearch = false;
  @Output() refreshPage = new EventEmitter<unknown>();
  @Output() addData = new EventEmitter<unknown>();
  @Output() editData = new EventEmitter<unknown>();
  @Output() deleteData = new EventEmitter<unknown>();
  @Output() applyFilter = new EventEmitter<unknown>();
  searchText = '';

  onRefresh() {
    this.refreshPage.emit();
  }

  onAdd() {
    this.addData.emit();
  }

  onEditDetails(event: unknown) {
    this.editData.emit(event);
  }
  onDeleteDetails(event: unknown) {
    this.deleteData.emit(event);
  }
}
