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
    return of(this.sortByScreenDate(emergencyScreens)).delay(this.delayMs);
  }

  getRecentProfiles(): Observable<EmergencyScreen[]> {
    const sortedArray = this.sortByScreenDate(emergencyScreens);
    const shortArray = sortedArray.slice(0, 30);
    return of(shortArray).delay(this.delayMs);
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  public sortByScreenDate(array: EmergencyScreen[]): EmergencyScreen[] {
    return array.sort((a: EmergencyScreen, b: EmergencyScreen) => {
      return this.getTime(b.ScreenDate) - this.getTime(a.ScreenDate);
    });
  }

  searchProfiles(searchTerm: string): Observable<EmergencyScreen[]> {
    const foundProfiles: EmergencyScreen[] = [];

    const matchFesaIds = emergencyScreens.filter(p =>
      p.FesaID.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchNames = emergencyScreens.slice().filter(s => {
      let returnVal = false;
      s.Children.filter(c => {
        if (c.FirstName.toLowerCase().includes(searchTerm.toLowerCase())) {
          returnVal = true;
        }
        if (c.LastName.toLowerCase().includes(searchTerm.toLowerCase())) {
          returnVal = true;
        }
      });

      s.ParentGuardians.filter(p => {
        if (p.FirstName.toLowerCase().includes(searchTerm.toLowerCase())) {
          returnVal = true;
        }
        if (p.LastName.toLowerCase().includes(searchTerm.toLowerCase())) {
          returnVal = true;
        }
      });

      return returnVal;
    });

   const searchResults = foundProfiles.concat(matchFesaIds || []).concat(matchNames || []);

    return of(searchResults).delay(this.delayMs);
  }

  getProfile(fesaId: string): Observable<EmergencyScreen> {
    try {
      const foundProfile = emergencyScreens.find(p => {
        return p.FesaID === fesaId;
      });
      if (foundProfile !== null && foundProfile !== undefined) {
        return of(foundProfile).delay(this.delayMs);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  updateProfile(profile: EmergencyScreen): Observable<EmergencyScreen> {
    console.log(profile);
    const oldProfile = emergencyScreens.find(p => p.FesaID === profile.FesaID);
    const newProfile = Object.assign(oldProfile, profile);

    return of(newProfile).delay(this.delayMs);
  }

  createProfile(newProfile: EmergencyScreen): Observable<EmergencyScreen> {
    const oldProfile = emergencyScreens.find(
      p => p.FesaID === newProfile.FesaID
    );
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
