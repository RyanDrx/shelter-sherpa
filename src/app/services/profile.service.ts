import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import {
  EmergencyScreen,
  emergencyScreens
} from './../models/emergency-screen';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProfileService {
  // simulate network delay
  delayMs = 500;

  getProfiles(): Observable<EmergencyScreen[]> {
    return of(emergencyScreens).delay(this.delayMs);
  }

  updateProfiles(profile: EmergencyScreen): Observable<EmergencyScreen> {
    const oldProfile = emergencyScreens.find(p => p.FesaID === profile.FesaID);
    const newProfile = Object.assign(oldProfile, profile);

    return of(newProfile).delay(this.delayMs);
  }

  createProfile(newProfile: EmergencyScreen): Observable<EmergencyScreen> {
    const oldProfile = emergencyScreens.find(p => p.FesaID === newProfile.FesaID);
    if (oldProfile) {
      return Observable.throw('FESA-ID Already exists');
    }
    try {
      emergencyScreens.push(newProfile);
      return of(newProfile).delay(this.delayMs);
    } catch (e) {
      this.handleError(e);
    }
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
