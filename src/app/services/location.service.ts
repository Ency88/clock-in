import { Injectable } from '@angular/core';
import { Geolocation, GeolocationPosition } from '@capacitor/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getCurrentPosition(): Observable<GeolocationPosition> {
    return from(Geolocation.getCurrentPosition({ enableHighAccuracy: true }));
  }
}
