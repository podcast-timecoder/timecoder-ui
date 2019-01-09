import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpisodeService } from '../service/episode.service';
import { Episode } from '../model/episode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent implements OnInit {

  episodes: Episode[];
  selectedEpisode: Episode;
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private episodeService: EpisodeService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.episodeService.getAllEpisodes()
      .subscribe(data => this.episodes = data)
  }

  showDetails(episode: Episode){
    this.router.navigate([`episode-details/${episode.id}`]);
  }

  onSelect(episode: Episode): void {
    this.selectedEpisode = episode;
    this.ngOnInit();
  }

  onSubmit() {
    this.episodeService.createEpisode(this.addForm.value)
      .subscribe(data => {
        this.addForm.reset()
        this.episodeService.getAllEpisodes()
        .subscribe(data => this.episodes = data)
      });
  }

  addTheme() {
    this.router.navigate(['add-theme']);
  }

  addEpisode() {
    this.router.navigate(['add-episode']);
  }
}
