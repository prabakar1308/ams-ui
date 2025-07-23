import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DashboardTank } from '@app/dashboard/models/dashboard-tank';

@Component({
  selector: 'app-tank-list',
  standalone: false,
  templateUrl: './tank-list.component.html',
  styleUrl: './tank-list.component.scss',
})
export class TankListComponent {
  @Input() title: string = '';
  @Input() tanks: DashboardTank[] = [];
  @Output() tankSelected = new EventEmitter<DashboardTank>();
}
