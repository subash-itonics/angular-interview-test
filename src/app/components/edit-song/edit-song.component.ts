import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { SongsConnector } from "src/app/connector/songs.connector";
import { DataApiService, Genre, SongsList } from "src/app/service/data-api.service";

@Component({
    selector: 'app-edit-song',
    templateUrl: './edit-song.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule]
})

export class EditSongComponent {
    editSongForm!: FormGroup;
    genres = Genre;
    songId!: string;

    constructor(
        private songsConnector: SongsConnector,
        private location: Location,
        private router: Router,
        private dataApiService: DataApiService
    ) {
        this.editSongForm = this.songsConnector.songsForm;

        const currentNavigation = this.router.getCurrentNavigation()

        if (currentNavigation && currentNavigation.extras && currentNavigation.extras.state) {
            const data: SongsList = currentNavigation.extras.state['song'];
            const {singerList, uri, ...rest} = data;
            this.songId = uri;
            this.editSongForm.patchValue({
                ...rest,
                singerList: singerList.toString()
            })
        } else {
            this.location.back();
        }
    }

    submit() {
        if (this.editSongForm.invalid) {
            this.editSongForm.markAllAsTouched();
            return
        }

        const {singerList, ...rest} = this.editSongForm.value;

        const data: SongsList = {
            uri: this.songId,
            singerList: singerList.split(','),
            ...rest
        }

        this.dataApiService.updateSong(data);
        this.editSongForm.reset();
        this.router.navigate(['/']);
    }
}