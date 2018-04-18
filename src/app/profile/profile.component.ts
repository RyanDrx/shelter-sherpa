import { Component, OnInit, Input } from '@angular/core';
import { EmergencyScreen } from '../models/emergency-screen';
import { ProfileService } from '../services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public Screen: EmergencyScreen;
  public Editable: boolean;
  public ready = false;
  private sub: any;

  public fesaID: string;


  constructor(
    private _profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.fesaID = params['id'] || undefined;
      if (this.fesaID) {
        // Existing profile
        const searchForProfile = this._profileService.getProfile(this.fesaID);

        searchForProfile.subscribe(screen => {
          this.Screen = screen;
          this.Editable = false;
        });

      } else {
        // new profile
        this.Screen = null;
        this.Editable = true;
      }
      this.ready = true;

    });
  }
}
