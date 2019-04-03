import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EpisodeService } from '../service/episode.service';
import { Theme } from '../model/theme';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { LoggedUserService } from '../service/logged-user.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { take, filter, switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'app-propose-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class ProposeThemeComponent implements OnInit {

  addForm: FormGroup;
  themes: Theme[];
  error: Object;
  validation: string;
  submitted:boolean = false;
  added: boolean = false;

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private dialog: MatDialog, 
              private episodeService: EpisodeService,
              private authService: AuthService,
              private sessionUserService: LoggedUserService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.episodeService.getAllThemesWithoutEpisode().subscribe(data => this.themes = data);
  }

  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }

    this.episodeService.addFreeTheme(this.addForm.value)
      .subscribe(data => { 
        this.added = true;
        this.addForm.reset() 
        this.getAllThemesWithoutEpisode();
        this.submitted = false;
      },
      error => {
        this.submitted = false;
        console.error(error)
        this.error = error;
        this.added = false;
      });
      setTimeout(() => this.added = false, 3000)
  }

  getAllThemesWithoutEpisode() {
    this.episodeService.getAllThemesWithoutEpisode().subscribe(data => this.themes = data);
  }

  isAuthorized(){
    return this.authService.isAuthenticated()
  }

  isAdmin(): boolean{
    return this.sessionUserService.getSessionUser().isAdmin
  }

  deleteTopic(theme: Theme){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '700px',
      data: `Do you confirm the deletion of theme ${theme.title}?`
    });

    dialogRef.afterClosed().pipe(
      take(1),
      filter(Boolean),
      switchMapTo(this.episodeService.deleteTopic(theme))
    )
    .subscribe(data => {
      this.getAllThemesWithoutEpisode();
     });
  }
}
