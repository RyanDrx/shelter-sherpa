import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { EmergencyScreen } from '../models/emergency-screen';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public recentProfiles: EmergencyScreen[];

  constructor(private _profileService: ProfileService) {}

  ngOnInit() {
    this._profileService.getProfiles().subscribe(values => {
      this.recentProfiles = values;
    });
  }
}
