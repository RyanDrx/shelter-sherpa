import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  public fillerGrid = Array(8)
  .fill(0)
  .map((_, i) => `Grid Card Item ${i + 1}`);
  constructor() { }

  ngOnInit() {
  }

}
