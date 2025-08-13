import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  standalone: false,
})
export class GenericTableComponent implements OnInit {
  @Input() data: unknown[] = []; // Input data for the table
  @Input() displayedColumns: string[] = []; // Columns to display
  @Input() showPagination: boolean = false; // Flag to show/hide pagination
  @Input() sticky: string = ''; // Flag for sticky headers
  @Output() editData = new EventEmitter<void>();
  @Output() deleteData = new EventEmitter<void>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<unknown>();

  ngOnInit(): void {
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: PageEvent): void {
    console.log('Page changed:', event);
    // Handle pagination logic here
  }
  onEdit(event: any): void {
    this.editData.emit(event);
  }
  onDelete(event: any): void {
    this.deleteData.emit(event);
  }
}
