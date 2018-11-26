import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderItem } from 'src/app/models/components/header/header-item.model';
import { UserAccessService } from 'src/app/services/user-access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('mySidenav') sideNav: ElementRef;

  headerItems: HeaderItem[] = [
  {
    text: 'Consultants',
    url: "/employees",
    icon: "fa fa-user",
    isActive: false,
    disabled: false
  },
  {
    text: 'Engagements',
    url: "/admin/engagements",
    icon: "fa fa-briefcase",
    isActive: false,
    disabled: false
  },
  {
    text: 'Projects',
    url: "/admin/projects",
    icon: "fa fa-cogs",
    isActive: false,
    disabled: false
  },
  {
    text: 'Teams',
    url: "/admin/teams",
    icon: "fa fa-users",
    isActive: false,
    disabled: false
  }
];

  constructor(
    private userAccessServ: UserAccessService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onUserLogout() {
    this.closeSideNav();
    this.userAccessServ.logout();
    this.router.navigateByUrl("/login");
  }

  openSideNav() {
    this.sideNav.nativeElement.style.width = "300px";
  }

  closeSideNav() {
    this.sideNav.nativeElement.style.width = "0px";
  }

}
