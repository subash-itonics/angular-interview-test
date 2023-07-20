import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataApiService, SongsList } from 'src/app/service/data-api.service';
import { SongListComponent } from '../song-list/song-list.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription, finalize } from 'rxjs';

@Component({
	selector: 'app-songs',
	templateUrl: './songs.component.html',
	styleUrls: ['./songs.component.scss'],
	standalone: true,
	imports: [CommonModule, RouterModule, FormsModule, SongListComponent]
})
export class SongsComponent implements OnInit, OnDestroy {
	songLists: SongsList[] = [];
	searchText = '';

	selectedSong!: SongsList;
	loading = false;

	fetchSongSubscription!: Subscription;

	@ViewChild('modal', {static: false}) modalRef!: ElementRef;

	set loader(val: boolean) {
		this.loading = val
	}

	get loader() {
		return this.loading;
	}

	constructor(
		private dataApiService: DataApiService,
		private router: Router,
		private renderer: Renderer2,
		private changeDetector : ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this.loader = true;
		this.fetchSongSubscription = this.dataApiService.fetchSongs()
		.pipe(finalize(() => this.loader = false))
		.subscribe((res) => {
			this.songLists = res;
		});
	}

	ngOnDestroy(): void {
		this.fetchSongSubscription.unsubscribe();
	}

	/**
	 * Search songs based on the song name
	 *
	 * @param name - Name of the song
	 */
	searchSongs(name: string) {
		this.loader = true;
		this.dataApiService.getSongsByName(name)
			.subscribe((res) => {
				this.songLists = res;
				this.loader = false
			});
	}

	/**
	 * Show song detail
	 *
	 * @param songId
	 */
	showDetails(songId: string) {		
		this.selectedSong = this.songLists.find((song: SongsList) => song.uri === songId) as SongsList;
		this.changeDetector.detectChanges();
		this.renderer.addClass(this.modalRef.nativeElement, 'show');
	}

	/**
	 * Change the selected song into the metal
	 */
	changeSongToMetal() {
		// this.songLists.filter((value))
		this.selectedSong.type = 'metal';
		this.close()

		// FIXME Weird behavior, type get updated in the songs list but it is not reflected in the table
		this.songLists = [...this.songLists];
	}

	editSong(song: SongsList) {
		this.router.navigate(['edit'], {state: {song}});
	}

	// closing the modal
	close() {
		this.renderer.removeClass(this.modalRef.nativeElement, 'show');
	}
}
