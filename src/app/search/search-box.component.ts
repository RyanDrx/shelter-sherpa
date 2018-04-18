import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-box',
  template: `
  <input #searchBox
    type="search"
    aria-label="search"
    placeholder="Search"
    [style.width]="width + 'px'"
    (input)="doSearch()"
    (keyup)="doSearch()"
    (focus)="doFocus()"
    (focusout)="doFocusOut()"
    (click)="doSearch()"
    (del)="doDelete()">`
})
export class SearchBoxComponent implements OnInit {
  private searchDebounce = 500;
  private searchSubject = new Subject<string>();
  public width = 180;

  @ViewChild('searchBox') searchBox: ElementRef;
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSearch = this.searchSubject.pipe(
    distinctUntilChanged(),
    debounceTime(this.searchDebounce)
  );
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFocus = new EventEmitter<string>();

  constructor(private _searchService: SearchService) {}

  ngOnInit() {
    this._searchService.searchQueryChange.subscribe(value => {
      this.searchBox.nativeElement.value = value;
    });
  }
  doDelete() {
    this._searchService.searchQueryChange.next(null);
  }
  doSearch() {
    this.searchSubject.next(this.query);
  }

  doFocus() {
    this.width = 200;
    this.onFocus.emit(this.query);
  }
  doFocusOut() {
    this.width = 180;
  }
  focus() {
    this.searchBox.nativeElement.focus();
  }

  private get query() {
    return this.searchBox.nativeElement.value;
  }
  private set query(value: string) {
    this.searchBox.nativeElement.value = value;
  }
}
