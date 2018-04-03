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
