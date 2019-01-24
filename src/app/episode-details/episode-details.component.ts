import { Component, OnInit, Input } from '@angular/core';
import { EpisodeService } from '../service/episode.service';
import { Episode } from '../model/episode';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Theme } from '../model/theme';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
    this.getEpisodeDetails();
    this.connect();
  }

  getEpisodeDetails(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.episodeService.getEpisodeById(id)
      .subscribe(data => this.episode = data);
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.episodeService.addTheme(this.episode.id, this.addForm.value)
      .subscribe(data => { this.getEpisodeDetails()
    });
    this.addForm.reset();
  }

  track(episode:  Episode, theme: Theme) {
     this.episodeService.updateTimestamp(episode.id, theme).subscribe(data => { this.getEpisodeDetails()});
  }

  startEpisode(episode: Episode) {
    this.episodeService.startEpisode(episode).subscribe(data => { this.getEpisodeDetails() });
  }

  stopEpisode(episode: Episode) {
    this.episodeService.stopEpisode(episode).subscribe(data => { this.getEpisodeDetails() });
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

  linkThemes(episode: Episode){
    this.router.navigate([`link-themes/${episode.id}`], { queryParams: { returnUrl: this.router.url }})
  }

  connect(): void {
    let source = new EventSource(`${ environment.apiUrl }/stream`);
    source.addEventListener('message', message => {
      this.getEpisodeDetails();
    });
 }

}
