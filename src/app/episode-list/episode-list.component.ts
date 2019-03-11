import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpisodeService } from '../service/episode.service';
import { Episode } from '../model/episode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { User } from '../model/user';
import { LoggedUserService } from '../service/logged-user.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { filter, switchMapTo, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent implements OnInit {

  episodes: Episode[];
  selectedEpisode: Episode;
  addForm: FormGroup;
  currentUser: User;
  added: boolean;
  error: Object;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private episodeService: EpisodeService,
              private sessionUserService: LoggedUserService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.currentUser = this.sessionUserService.getSessionUser();

    this.episodeService.getAllEpisodes()
      .subscribe(data => this.episodes = data);
  }

  showDetails(episode: Episode) {
    this.router.navigate([`episode-details/${episode.id}`]);
  }

  onSelect(episode: Episode): void {
    this.selectedEpisode = episode;
    this.getAllEpisodes();
    this.showDetails(episode);
  }

  onSubmit() {
    this.episodeService.createEpisode(this.addForm.value)
      .subscribe(data => {
        this.addForm.reset();
        this.getAllEpisodes();
        this.added = true;
      },
      error => {
        this.error = error;
      });
  }

  addEpisode() {
    this.router.navigate(['add-episode']);
  }

  removeEpisode(episode: Episode) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: `Do you confirm the deletion of episode ${episode.name}?`
    });
    dialogRef.afterClosed().pipe(
      take(1),
      filter(Boolean),
      switchMapTo(this.episodeService.removeEpisode(episode.id))
    )
     .subscribe(data => {
        this.getAllEpisodes();
     });
  }

  getAllEpisodes(): void {
    this.episodeService.getAllEpisodes()
      .subscribe(data => this.episodes = data);
  }
}
