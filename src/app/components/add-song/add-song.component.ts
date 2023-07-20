import { CommonModule } from "@angular/common";
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { LOCAL_STORAGE_KEY, SongsConnector } from "src/app/connector/songs.connector";
import { DataApiService, Genre } from "src/app/service/data-api.service";

@Component({
    selector: 'app-add-song',
    templateUrl: './add-song.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule]
})

export class AddSongComponent implements OnInit, OnDestroy{
    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: Event) {
        if (this.addSongForm.get('name')?.valid || this.addSongForm.get('singerList')?.valid || this.addSongForm.get('type')?.valid) {
            localStorage.setItem(LOCAL_STORAGE_KEY.UNSAVED_DATA, JSON.stringify(this.addSongForm.value))
        } 
    }
    addSongForm!: FormGroup;
    genres = Genre;

    constructor(
        private dataApiService: DataApiService,
        private router: Router,
        private songsConnector: SongsConnector
    ) {
        this.addSongForm = this.songsConnector.songsForm;
    }

    ngOnInit(): void {
        if (localStorage.getItem(LOCAL_STORAGE_KEY.UNSAVED_DATA)) {
            this.addSongForm.patchValue({
                ...JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.UNSAVED_DATA) as string)
            })
        }
    }

    ngOnDestroy(): void {
        
    }

    hasUnsavedData(): boolean {
        return !!this.addSongForm.get('name')?.valid || 
        !!this.addSongForm.get('list')?.valid || 
        !!this.addSongForm.get('type')?.valid
    }

    submit() {
        if (this.addSongForm.invalid) {
            this.addSongForm.markAllAsTouched();
            return;
        }

        const { singerList, ...rest } = this.addSongForm.value

        this.dataApiService.addSong({...rest, singerList: singerList.split(',')});

        if (localStorage.getItem(LOCAL_STORAGE_KEY.UNSAVED_DATA)) {
            localStorage.removeItem(LOCAL_STORAGE_KEY.UNSAVED_DATA);
        }
        this.addSongForm.reset();
        this.addSongForm.markAsUntouched();
        this.router.navigate(['/']);

    }
}