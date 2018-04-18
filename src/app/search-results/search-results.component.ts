import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges
} from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatDialogRef
} from '@angular/material';
import { EmergencyScreen } from '../models/emergency-screen';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent
  implements AfterViewInit, OnInit, OnChanges {
  @Input() searchResults: EmergencyScreen[];
  @Input() searchValue: string;
  @Input() dialogRef: MatDialogRef<SearchComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router) {}

  public resultsList;
  public displayedColumns = [
    'FesaID',
    'ParentGuardians',
    'Children',
    'ScreenDate',
    'ViewProfile'
  ];

  goToProfile(id: string) {
    this.dialogRef.close();
    this.router.navigateByUrl(`/profile/${id}`);
  }

  ngOnInit(): void {
    this.updateSearchResults();
  }
  ngAfterViewInit() {
    this.resultsList.paginator = this.paginator;
    this.resultsList.sort = this.sort;
  }
  ngOnChanges(): void {
    this.updateSearchResults();
    this.updateDataSourceProps();
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
