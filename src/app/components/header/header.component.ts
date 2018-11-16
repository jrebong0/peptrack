import { Component, OnInit } from '@angular/core';
import { HeaderItem } from 'src/app/models/components/header/header-item.model';

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
  constructor() { }

  ngOnInit() {
  }

}
