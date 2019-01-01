import { Component, OnInit } from '@angular/core';
import { EpisodeService } from '../service/episode.service';
import { Episode } from '../model/episode';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Theme } from '../model/theme';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css']
})
export class EpisodeDetailsComponent implements OnInit {

  episode: Episode;
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private route: ActivatedRoute, 
              private episodeService: EpisodeService, 
              private location: Location) { }

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

  track(theme: Theme) {
     this.episodeService.updateTimestamp(theme).subscribe(data => { this.getServiceDetails()
     });
  }
}
