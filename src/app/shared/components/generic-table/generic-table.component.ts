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
  @Input() showSearch: boolean = false; // Flag to show/hide search input
  @Input() searchText: string = ''; // Search text for filtering
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

    if (this.showSearch) {
      this.applyFilter(this.searchText);
    }
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

  // Add this method to filter dataSource based on searchText
  applyFilter(inputValue: string) {
    const filterValue = inputValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: unknown, filter: string) => {
      // Helper to recursively search all values, including nested objects
      const search = (obj: any): boolean => {
        return Object.values(obj).some((val) => {
          if (val && typeof val === 'object') {
            return search(val);
          }
          return val && val.toString().toLowerCase().includes(filter);
        });
      };
      return search(data);
    };
    this.dataSource.filter = filterValue;
  }
}
