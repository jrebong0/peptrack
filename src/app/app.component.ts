import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peptrack';
  tempEmployees: Observable<any[]>;

  constructor(
    private employeeService: EmployeeService
  ) {
    this.tempEmployees = this.employeeService.getEmployees();
  }
}
