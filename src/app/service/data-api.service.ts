import { Injectable } from '@angular/core';
import { Observable, debounce, interval, of } from 'rxjs';
import { songsCollection } from '../mockData/songs';

export interface SongsList extends SongRequest{
    uri: string;
    
}

export interface SongRequest {
  name: string;
    type: string;
    singerList: string[],
}

export enum Genre {
  POP = 'pop',
  ROCK = 'rock',
  METAL = 'metal'
}

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  // Cache the songs list
  private allSongs: SongsList[] = songsCollection;

  constructor() {}

  /**
   * Get list of songs
   *
   * @returns
   */
  public fetchSongs(): Observable<any> {
    return of(this.allSongs);
  }

  /**
   * Get list of the songs based on song name
   *
   * @param songName
   * @returns
   */
  public getSongsByName(songName: string): Observable<SongsList[]> {
    const songs = this.allSongs.filter((song) => song.name.includes(songName));

    return new Observable((observer) => {
      observer.next(songs);
    }).pipe(debounce(() => interval(2000))) as unknown as Observable<SongsList[]>;
  }

  public addSong(request: SongRequest) {
    const count = this.allSongs.length + 1;
    this.allSongs = [
      ...this.allSongs,
      {
        uri: 'song' + count,
        ...request
      }
    ]
  }

  public updateSong(songList: SongsList) {
    this.allSongs = this.allSongs.map((song) => {
      if (song.uri === songList.uri) {
        song.name = songList.name,
        song.type = songList.type,
        song.singerList = songList.singerList
      } 
      return song;
    })
  }
}
