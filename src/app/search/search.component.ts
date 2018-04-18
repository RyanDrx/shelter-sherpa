import { SearchService } from './../services/search.service';
import { EmergencyScreen } from './../models/emergency-screen';
import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { ProfileService } from '../services/profile.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private searchSubject: Subject<string> = new Subject();
  public searchValue: string;
  public searchResults: EmergencyScreen[];

  public searchInput: string;

  constructor(
    private _profileService: ProfileService,
    private _searchService: SearchService,
    public dialogRef: MatDialogRef<SearchComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.searchSubject.subscribe(searchTextValue => {
      this.handleSearch(searchTextValue);
    });

    this._searchService.searchQueryChange.subscribe(value => {
      this.searchInput = value;
      this.handleSearch(value);
    });

    if (this._searchService.searchQuery) {
      this.searchInput = this._searchService.searchQuery;
      this.handleSearch(this._searchService.searchQuery);
    }
  }

  handleSearch(searchText: string) {
    if (searchText) {
      if (searchText.length > 1) {
        this.searchValue = searchText;
        this._profileService
          .searchProfiles(this.searchValue)
          .subscribe(values => {
            this.searchResults = values;
          });
      }
    }
  }

  submitSearch() {
    this.searchSubject.next(this.searchInput);
  }

  onKeyUp($event) {
    const val = $event.target.value;

    console.log($event);
    if ($event.key === 'Enter') {
      this.searchSubject.next(val);
    }
  }
}
