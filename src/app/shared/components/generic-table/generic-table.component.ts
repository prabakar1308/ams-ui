import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  standalone: false,
})
export class GenericTableComponent implements OnInit {
  @Input() data: unknown[] = []; // Input data for the table
  @Input() displayedColumns: string[] = []; // Columns to display
  @Input() totalLength: number = 0; // Total number of items for pagination
  @Input() pageSize: number = 10; // Default page size
  @Output() editData = new EventEmitter<void>();
  @Output() deleteData = new EventEmitter<void>();

  dataSource = new MatTableDataSource<unknown>();

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.data;
  }

  onPageChange(event: PageEvent): void {
    console.log('Page changed:', event);
    // Handle pagination logic here
  }
  onEdit(event: any): void {
    console.log('Edit data:', event);
    this.editData.emit(event);
  }
  onDelete(event: any): void {
    console.log('Delete data:', event);
    this.deleteData.emit(event);
  }
}
