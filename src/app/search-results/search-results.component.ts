import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges
} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { EmergencyScreen } from '../models/emergency-screen';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent
  implements AfterViewInit, OnInit, OnChanges {
  @Input() searchResults: EmergencyScreen[];
  @Input() searchValue: string;

  public resultsList;
  public displayedColumns = [
    'FesaID',
    'ParentGuardians',
    'Children',
    'ScreenDate',
    'ViewProfile'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.updateSearchResults();
  }
  ngAfterViewInit() {
    this.resultsList.paginator = this.paginator;
    this.resultsList.sort = this.sort;
  }
  ngOnChanges(): void {
    this.updateSearchResults();
    this.updateDataSourceProps() ;
  }

  updateSearchResults() {
    this.resultsList = new MatTableDataSource<EmergencyScreen>(
      this.searchResults
    );
  }

  updateDataSourceProps() {
    this.resultsList.paginator = this.paginator;
    this.resultsList.sort = this.sort;
  }
}
