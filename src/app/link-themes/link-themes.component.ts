import { Component, OnInit } from '@angular/core';
import { Episode } from '../model/episode';
import { EpisodeService } from '../service/episode.service';
import { ActivatedRoute } from '@angular/router';
import { Theme } from '../model/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-link-themes',
  templateUrl: './link-themes.component.html',
  styleUrls: ['./link-themes.component.css']
})
export class LinkThemesComponent implements OnInit {

  addForm: FormGroup;
  episode: Episode;
  themeList: Theme[];

  constructor(private episodeService: EpisodeService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.getEpisodeDetails()
    this.getAvailableThemes()  
  }

  getEpisodeDetails() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.episodeService.getEpisodeById(id).subscribe(data => this.episode = data);
  }

  getAvailableThemes(){
    this.episodeService.getAllThemesWithoutEpisode().subscribe(data => this.themeList = data)
  }

  onSubmit(){
    console.log(this.addForm.value)
  }

}
