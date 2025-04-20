import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }


  getDashboardData() {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0NTA3MzMyNiwiZXhwIjoxNzQ1MTU5NzI2LCJhdWQiOiJsb2NhbGhvc3Q6MzAwMCIsImlzcyI6ImxvY2FsaG9zdDozMDAwIn0.7t09D7lpiBIehpml-mOx9hxw9mAzsusXTSq0O9763lU');
    return this.http.get('http://localhost:3000/api/dashboard/active-worksheets/1', {
      headers: httpHeaders
    });
  }
  // getDashboardDataById(id: string) {
  //   return this.http.get('http://localhost:3000/api/dashboard/active-worksheets/${id}');
  // }
}
