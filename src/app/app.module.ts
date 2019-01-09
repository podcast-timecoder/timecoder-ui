import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HttpClientModule } from "@angular/common/http";
import { UserService } from './service/user.service';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { UiModule } from './ui/ui.module';
import { FilterPipe } from './pipes/filter.pipe';
import { ExportComponent } from './export/export.component';

import { ProposeThemeComponent } from './add-theme/add-theme.component';

import { AuthGuardService } from './service/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { LinkThemesComponent } from './link-themes/link-themes.component';
import { LinkifyPipe } from './pipes/linkify.pipe';


@NgModule({
  declarations: [
    AppComponent,
    EpisodeListComponent,
    EpisodeDetailsComponent,
    FilterPipe,
    LinkifyPipe,
    ExportComponent,
    ProposeThemeComponent,
    LoginComponent,
    LinkThemesComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    UiModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
