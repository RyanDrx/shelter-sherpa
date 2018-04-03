import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {
  trigger,
  transition,
  useAnimation,
  state,
  style
} from '@angular/animations';
import { rotateIn, zoomIn } from 'ng-animate';

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

  fillerNav = Array(10)
    .fill(0)
    .map((_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array(8)
    .fill(0)
    .map(
      () =>
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    );

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  toggleState(navOpen: boolean) {
    this.state = navOpen ? 'inactive' : 'active';
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
