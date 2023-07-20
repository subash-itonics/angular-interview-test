import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LOCAL_STORAGE_KEY } from 'src/app/connector/songs.connector';

@Injectable({
  providedIn: 'root',
})
export class AddSongGuard {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (localStorage.getItem(LOCAL_STORAGE_KEY.UNSAVED_DATA)) {
        alert('Please fill the previously unsaved values in the form');
      }
      return true;
  }

  
}
