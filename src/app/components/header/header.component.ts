import { Component, OnInit } from '@angular/core';
import { HeaderItem } from 'src/app/models/components/header/header-item.model';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerItems: HeaderItem[] = [{
    text: 'Home',
    url: "",
    isActive: true,
    disabled: false
  },
  {
    text: 'Employees',
    url: "",
    isActive: false,
    disabled: false
  },
  {
    text: 'Towers',
    url: "",
    isActive: false,
    disabled: false
  },
  {
    text: 'Studios',
    url: "",
    isActive: false,
    disabled: false
  },
  {
    text: 'Admin',
    url: "",
    isActive: false,
    disabled: false
  }];
  constructor() { }

  ngOnInit() {
  }

}
