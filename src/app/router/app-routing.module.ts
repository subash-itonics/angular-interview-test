import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsRoutingModule } from './songs/songs-routing.module';
import { AddSongGuard } from './guards/add-song.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./songs/songs-routing.module').then((module) => module.SongsRoutingModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./add-song/add-song-routing.module').then((module) => module.AddSongRoutingModule),
    canActivate: [AddSongGuard]
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit-song/edit-song-routing.module').then((module) => module.EditSongRoutingModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
