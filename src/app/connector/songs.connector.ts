import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

export const LOCAL_STORAGE_KEY = {
    UNSAVED_DATA: 'unsaved-data'
}

@Injectable({
    providedIn: 'root'
})

export class SongsConnector {
    get songsForm() {
        return this.formBuilder.group({
            name: [null, [Validators.required, Validators.pattern(/^(?!.\s{2})[^ ](?!. $)[A-Za-z0-9\s'-]{3,}$/)]],
            singerList: [null, [Validators.required, Validators.pattern(/^([A-Z],)*[A-Z]$/)]],
            type: [null, Validators.required]
        })
    }

    constructor(
        private formBuilder: FormBuilder
    ) {}
}