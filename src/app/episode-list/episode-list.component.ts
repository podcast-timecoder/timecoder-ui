import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpisodeService } from '../service/episode.service';
import { Episode } from '../model/episode';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent implements OnInit {

  episodes: Episode[];

  constructor(private router: Router, private episodeService: EpisodeService) { }

  ngOnInit() {
    this.episodeService.getAllEpisodes()
      .subscribe(data => this.episodes = data)
  }

  addEpisode(): void {
    this.router.navigate(['add-episode']);
  };

  showDetails(episode: Episode){
    this.router.navigate([`episode-details/${episode.id}`]);
  }

}
