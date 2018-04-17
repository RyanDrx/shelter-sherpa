import { EmergencyScreen } from './../models/emergency-screen';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private searchSubject: Subject<string> = new Subject();
  public searchValue: string;
  public searchResults: EmergencyScreen[];

  constructor(private _profileService: ProfileService) {}

  ngOnInit() {
    this.searchSubject.debounceTime(500).subscribe(searchTextValue => {
      this.handleSearch(searchTextValue);
    });
  }

  handleSearch(searchText: string) {

    if (searchText.length > 1) {
      console.log(searchText.length);
      this.searchValue = searchText;
      this._profileService
        .searchProfiles(this.searchValue)
        .subscribe(values => {
          this.searchResults = values;
        });
    }
  }

  onKeyUp($event) {
    const val = $event.target.value;
    this.searchSubject.next(val);
  }
}
