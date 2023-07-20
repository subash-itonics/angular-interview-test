import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SongsList } from 'src/app/service/data-api.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class SongListComponent {
  @Input()
  songLists: SongsList[] = [];

  @Input() loader = false;

  @Output()
  onSongViewDetailClicked: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onSongEditClicked: EventEmitter<SongsList> = new EventEmitter<SongsList>();

  constructor() {}

  /**
   * Combine List of singers in the form of
   * eg.
   * [A] -> A
   * [A,B] -> A and B
   * [A,B,B] -> A, B and C
   * [A,B,C,D] -> A, B , C and D
   * [A,B,C,D,E,F] -> A, B, C, D, E and 1 Others
   * [A,B,C,D,E,F,G] -> A, B, C, D, E and 2 Others
   * @param valueArray
   * @returns
   */
  combineSingerList(valueArray: Array<any>) {
    return valueArray.toString();
  }

  /**
   * Emit song id to parent
   *
   * @param song - Selected song
   */
  viewDetail(song: SongsList) {
    this.onSongViewDetailClicked.emit(song.uri);
  }

  /**
   * Open form with the prefilled data and allow to update the content
   */
  editSongs(song: SongsList) {

    this.onSongEditClicked.emit(song);
  }
}
