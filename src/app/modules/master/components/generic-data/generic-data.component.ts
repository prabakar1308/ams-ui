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
  @Input() showDateRange = false;
  @Input() extraInfos: { label: string; value: string | number }[] = [];
  @Output() refreshPage = new EventEmitter<unknown>();
  @Output() addData = new EventEmitter<unknown>();
  @Output() editData = new EventEmitter<unknown>();
  @Output() deleteData = new EventEmitter<unknown>();
  @Output() applyFilter = new EventEmitter<unknown>();
  searchText = '';
  dateValue = { startDate: new Date(), endDate: new Date() };

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
  dateChange(event: unknown): void {
    const date: { start: string; end: string } = event as { start: string; end: string };
    if (date) {
      const { start, end } = date;
      this.dateValue = { startDate: new Date(start), endDate: new Date(end) };
      this.applyFilter.emit(this.dateValue);
    }
  }
}
