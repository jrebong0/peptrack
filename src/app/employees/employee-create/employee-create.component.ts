import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
    @ViewChild('f') employeeForm: NgForm;

    submitted = false;

    employee = {
        firstname: '',
        lastname: '',
        email: '',
        studio: '',
        emp_status: ''
    };

    constructor() { }

    ngOnInit() {
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.employeeForm.value);
        this.employee.firstname = this.employeeForm.value.employeeData.username;
        this.employee.lastname = this.employeeForm.value.employeeData.lastname;
        this.employee.email = this.employeeForm.value.employeeData.email;
        this.employee.studio = this.employeeForm.value.employeeData.studio;
      this.employee.emp_status = this.employeeForm.value.employeeData.emp_status;

        this.employeeForm.reset();
    }
}
