import { Component, OnInit } from '@angular/core';
import { EpisodeService } from '../service/episode.service';
import { ActivatedRoute } from '@angular/router';
import { Episode } from '../model/episode';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  episode: Episode;

  constructor(private episodeService: EpisodeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.episodeService.getServiceById(id).subscribe(data => this.episode = data);
  }

}
