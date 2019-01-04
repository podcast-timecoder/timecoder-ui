import { RouterModule, Routes } from '@angular/router';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';
import { ExportComponent } from './export/export.component';
import { ProposeThemeComponent } from './add-theme/add-theme.component';

const routes: Routes = [
  { path: 'episode-list', component: EpisodeListComponent},
  { path: 'episode-details/:id', component: EpisodeDetailsComponent },
  { path: 'export/:id', component: ExportComponent },
  { path: "add-theme", component: ProposeThemeComponent },
  { path: 'list', component: EpisodeListComponent }
];

export const routing = RouterModule.forRoot(routes);
