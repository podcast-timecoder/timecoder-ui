import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EpisodeService } from '../service/episode.service';

@Component({
  selector: 'app-add-episode',
  templateUrl: './add-episode.component.html',
  styleUrls: ['./add-episode.component.css']
})
export class AddEpisodeComponent implements OnInit {

  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private episodeService: EpisodeService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    this.episodeService.createEpisode(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['episode-list']);
      });
  }
}
