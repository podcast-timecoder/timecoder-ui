import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { AddEpisodeComponent } from './add-episode/add-episode.component';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';
import { ExportComponent } from './export/export.component';
import { ProposeThemeComponent } from './propose-theme/propose-theme.component';

const routes: Routes = [
  { path: 'add-user', component: AddUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'episode-list', component: EpisodeListComponent},
  { path: 'add-episode', component: AddEpisodeComponent },
  { path: 'episode-details/:id', component: EpisodeDetailsComponent },
  { path: 'export/:id', component: ExportComponent },
  { path: "add-theme", component: ProposeThemeComponent },
  { path: 'home', component: EpisodeListComponent }
];

export const routing = RouterModule.forRoot(routes);
