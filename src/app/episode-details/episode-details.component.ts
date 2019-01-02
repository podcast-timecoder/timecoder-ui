import { Component, OnInit } from '@angular/core';
import { EpisodeService } from '../service/episode.service';
import { Episode } from '../model/episode';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Theme } from '../model/theme';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css']
})
export class EpisodeDetailsComponent implements OnInit {

  public now: Date = new Date();
  episode: Episode;
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              private route: ActivatedRoute, 
              private episodeService: EpisodeService, 
              private location: Location) {
                setInterval(() => {
                  this.now = new Date();
                }, 1);
               }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
    this.getServiceDetails();
  }

  getServiceDetails(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.episodeService.getServiceById(id)
      .subscribe(data => this.episode = data);
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.episodeService.addTheme(id, this.addForm.value)
      .subscribe(data => { this.getServiceDetails()
      });
    this.addForm.reset();
  }

  track(episode:  Episode, theme: Theme) {
     this.episodeService.updateTimestamp(episode.id, theme).subscribe(data => { this.getServiceDetails()});
  }

  startEpisode(episode: Episode) {
    this.episodeService.startEpisode(episode).subscribe(data => { this.getServiceDetails() });
  }

  stopEpisode(episode: Episode) {
    this.episodeService.stopEpisode(episode).subscribe(data => { this.getServiceDetails() });
  }

  isFinished(episode: Episode): boolean {
    if(!episode){
      return false;
    }
    return !episode.started && episode.themeList.filter(val => val.passed === true).length > 0;
  }

  export(episode: Episode){
    this.router.navigate([`export/${episode.id}`])
  }
}
