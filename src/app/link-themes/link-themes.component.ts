import { Component, OnInit } from '@angular/core';
import { Episode } from '../model/episode';
import { EpisodeService } from '../service/episode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from '../model/theme';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-link-themes',
  templateUrl: './link-themes.component.html',
  styleUrls: ['./link-themes.component.css']
})
export class LinkThemesComponent implements OnInit {

  form: FormGroup;
  episode: Episode;
  themeList: Theme[];


  constructor(private episodeService: EpisodeService, 
              private route: ActivatedRoute, 
              private formBuilder: FormBuilder,
              private location: Location) { }

  ngOnInit() {
    this.getEpisodeDetails();
     
    this.episodeService.getAllThemesWithoutEpisode().subscribe(data => { 
      this.themeList = data 
      
      const controls = this.themeList.map(c => new FormControl(false));
      this.form = this.formBuilder.group({
        themeList: new FormArray(controls)
      });
    })

    
  }

  getEpisodeDetails() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.episodeService.getEpisodeById(id).subscribe(data => this.episode = data);
  }

  getAvailableThemes(){
    this.episodeService.getAllThemesWithoutEpisode().subscribe(data => this.themeList = data)
  }

  submit(){
    const selectedThemeIds = this.form.value.themeList
      .map((v, i) => v ? this.themeList[i].id : null)
      .filter(v => v !== null);

    console.log(selectedThemeIds);

    this.episodeService.linkThemesToEpisode(this.episode, selectedThemeIds).subscribe();

    this.location.back();
  }

}
