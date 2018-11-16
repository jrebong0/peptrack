import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employees: Employee[];
  employee: Employee;

  constructor(
    private employeeSrv: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    try{
      this.employeeSrv.getEmployees().subscribe(
        (any: any) => {
          this.employees = any;
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(form: NgForm) {
    if (this.getUserDetails(form.value.email, form.value.password)) {
      this.router.navigate(["/"]); /* Routing ready */
    };
  }

  getUserDetails(userEmail: string, userPass: string) {
    try{
      this.employee = this.employees.find(
        user => user.email === userEmail
      );
      if (this.employee !== undefined) {
        return this.employee.password === userPass ? true : false;
      }
      else {
        console.log("Account does not exist.");
      }
    } catch (error) {
      console.log(error);
    }
  }

}
