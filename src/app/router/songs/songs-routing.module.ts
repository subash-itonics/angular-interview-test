import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from 'src/app/components/songs/songs.component';

const routes: Routes = [
    {
        path: '',
        component: SongsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }