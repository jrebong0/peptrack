import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccessService } from 'src/app/services/user-access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employees: Employee[];
  employee: Employee;

  return: string = "";
  errorMessage: string = "";

  isExisting: boolean;
  noAccount: string;

  constructor(
    private employeeSrv: EmployeeService,
    private userAccessServ: UserAccessService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    try {
      this.route.queryParams
      .subscribe(params =>
        this.return = params['return'] || '/home'
      );

      if (this.userAccessServ.hasUserLoggedIn()) {
        this.router.navigate(["/"]);
      }
      else {
        this.employeeSrv.getEmployees().subscribe(
          (any: any) => {
            this.employees = any;
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(form: NgForm) {
    this.errorMessage = "";
    if (this.getUserDetails(form.value.email, form.value.password)) {
      this.employee.securityGroup = { name: "Placeholder"};
      this.userAccessServ.insertUserToken(this.employee);
      this.router.navigateByUrl(this.return);
    } else {
      this.errorMessage = "Invalid username/password";
    };
  }

  getUserDetails(userEmail: string, userPass: string) {
    try {
      this.employee = this.employees.find(
        user => user.email === userEmail
      );
      if (this.employee !== undefined) {
        return this.employee.password === userPass ? true : false;
      }
      else {
        this.errorMessage = "Invalid username/password";
        return false;
      }
    } catch (error) {
      this.errorMessage = "Cannot get employee data";
    }
  }

}
