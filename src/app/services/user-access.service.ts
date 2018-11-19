import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {

  constructor() {

  }

  insertUserToken(employee: Employee) {
    localStorage.setItem("currentUser", employee.id);
  }

  getUserToken() : Employee {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  hasUserLoggedIn() {
    return localStorage.getItem("currentUser");
  }

  logout() {
    localStorage.removeItem("currentUser");
  }
}
