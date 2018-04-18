import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {
  trigger,
  transition,
  useAnimation,
  state,
  style
} from '@angular/animations';
import { rotateIn, zoomIn } from 'ng-animate';
import { SearchService } from './services/search.service';
import { Router } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('rotate', [
      state('active', style({})),
      transition(
        '* => active',
        useAnimation(zoomIn, {
          params: { timing: 0.3 }
        })
      ),
      state('inactive', style({})),
      transition(
        '* => inactive',
        useAnimation(rotateIn, {
          params: { timing: 0.3 }
        })
      )
    ])
  ]
})
export class AppComponent implements OnDestroy {
  rotate: any;
  state = 'inactive';
  title = 'app';
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    private _searchService: SearchService,
    private _router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SearchComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this._searchService.searchQueryChange.next(null);
    });
  }

  doSearch(query: string) {
    if (query !== null && query.match(/^ *$/) === null && query.length > 1) {
      this._searchService.searchQueryChange.next(query);
      if (this.dialog.openDialogs.length === 0) {
        this.openDialog();
      }
    }
  }

  toggleState(navOpen: boolean) {
    this.state = navOpen ? 'inactive' : 'active';
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
