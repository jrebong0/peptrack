import { Component, OnInit } from '@angular/core';
import { HeaderItem } from 'src/app/models/components/header/header-item.model';
import { UserAccessService } from 'src/app/services/user-access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerItems: HeaderItem[] = [
  {
    text: 'Employees',
    url: "/employees",
    isActive: false,
    disabled: false
  },
  {
    text: 'Towers',
    url: "/towers",
    isActive: false,
    disabled: false
  },
  {
    text: 'Studios',
    url: "/studios",
    isActive: false,
    disabled: false
  }];

  constructor(
    private userAccessServ: UserAccessService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onUserLogout() {
    this.userAccessServ.logout();
    this.router.navigateByUrl("/login");
  }

}
