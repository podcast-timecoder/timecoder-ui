import { RouterModule, Routes } from '@angular/router';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';
import { ExportComponent } from './export/export.component';
import { 
  AuthGuardService as AuthGuard 
} from './service/auth-guard.service';
import { ProposeThemeComponent } from './add-theme/add-theme.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'export/:id', component: ExportComponent, canActivate: [AuthGuard] },
  { path: "add-theme", component: ProposeThemeComponent },
  { path: 'list', component: EpisodeListComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent }
]

export const routing = RouterModule.forRoot(routes);
