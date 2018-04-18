import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchService {

  public searchQuery: string;
  public searchQueryChange: Subject<string> = new Subject<string>();

  constructor() {
    this.searchQueryChange.subscribe((value) => {
      this.searchQuery = value;
    });
  }
}
