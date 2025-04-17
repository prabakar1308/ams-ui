import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-master-home',
  standalone: false,
  templateUrl: './master-home.component.html',
  styleUrl: './master-home.component.scss',
})
export class MasterHomeComponent implements OnInit {
  constructor(private masterService: MasterService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.masterService.getUsers().subscribe((res) => {
      console.log('Users:', res);
    });
  }
}
