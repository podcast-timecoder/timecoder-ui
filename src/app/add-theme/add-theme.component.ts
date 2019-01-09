import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EpisodeService } from '../service/episode.service';
import { Theme } from '../model/theme';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-propose-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class ProposeThemeComponent implements OnInit {

  addForm: FormGroup;
  themes: Theme[];

  constructor(private formBuilder: FormBuilder, 
              private router: Router, 
              private episodeService: EpisodeService,
              private authService: AuthService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
    this.episodeService.getAllThemesWithoutEpisode().subscribe(data => this.themes = data);
  }

  onSubmit() {
    this.episodeService.addFreeTheme(this.addForm.value)
      .subscribe(data => { 
        this.addForm.reset() 
        this.getAllThemesWithoutEpisode();
      });
  }

  getAllThemesWithoutEpisode() {
    this.episodeService.getAllThemesWithoutEpisode().subscribe(data => this.themes = data);
  }

  isAuthorized(){
    return this.authService.isAuthenticated()
  }
}
