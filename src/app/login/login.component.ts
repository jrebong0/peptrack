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
  isExisting: boolean;
  noAccount: string;

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
      this.isExisting = true;
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(form: NgForm) {
    if (this.getUserDetails(form.value.email, form.value.password)) {
      this.router.navigate(["/"]);
    }
    else {
      this.isExisting = false;
      this.noAccount = "Account does not exist.";
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
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

}
