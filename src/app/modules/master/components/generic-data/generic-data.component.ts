import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-data',
  standalone: false,
  templateUrl: './generic-data.component.html',
  styleUrl: './generic-data.component.scss',
})
export class GenericDataComponent implements OnInit {
  @Input() title!: string;
  @Input() data!: unknown[];
  @Input() displayColumns!: string[];
  @Input() sticky = '';
  @Input() showSearch = false;
  @Input() buttonFeature = '';
  @Input() showDateRange = false;
  @Input() extraInfos: { label: string; value: string | number }[] = [];
  @Output() refreshPage = new EventEmitter<unknown>();
  @Output() addData = new EventEmitter<unknown>();
  @Output() editData = new EventEmitter<unknown>();
  @Output() deleteData = new EventEmitter<unknown>();
  @Output() applyFilter = new EventEmitter<unknown>();
  @Output() btnClick = new EventEmitter<unknown>();
  searchText = '';
  dateValue = { startDate: new Date(), endDate: new Date() };

  // last 30 days selected by default
  selectedValue = 29;
  periods = [
    {
      label: 'Today',
      value: 0,
    },
    {
      label: 'Last 2 days',
      value: 1,
    },
    {
      label: 'Last 3 days',
      value: 2,
    },
    {
      label: 'Last 7 days',
      value: 6,
    },
    {
      label: 'Last 30 days',
      value: 29,
    },
    {
      label: 'Last 90 days',
      value: 89,
    },
    {
      label: 'Last 180 days',
      value: 179,
    },
    {
      label: 'Last 1 year',
      value: 364,
    },
  ];

  ngOnInit() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - this.selectedValue);
    this.dateValue = { ...this.dateValue, startDate };
  }

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

  periodChange(days: number) {
    this.selectedValue = days;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    this.dateValue = { startDate, endDate };
    this.applyFilter.emit(this.dateValue);
  }

  // dateChange(event: unknown): void {
  //   const date: { start: string; end: string } = event as { start: string; end: string };
  //   if (date) {
  //     const { start, end } = date;
  //     this.dateValue = { startDate: new Date(start), endDate: new Date(end) };
  //     this.applyFilter.emit(this.dateValue);
  //   }
  // }
}
