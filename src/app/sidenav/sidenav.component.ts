import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public fillerNav = Array(10)
    .fill(0)
    .map((_, i) => `Nav Item ${i + 1}`);

  constructor() {}

  ngOnInit() {}
}
