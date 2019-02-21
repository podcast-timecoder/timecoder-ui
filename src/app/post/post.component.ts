import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Episode} from "../model/episode";
import {PatronList} from "../model/patron.list";
import {EpisodeService} from "../service/episode.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PatronService} from "../service/patron.service";
import {PostService} from "../service/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postForm: FormGroup;
  episode: Episode;
  patronList: PatronList;
  submitted = false;
  guests: Array<string> = [];

  constructor(private episodeService: EpisodeService,
              private route: ActivatedRoute,
              private patronService: PatronService,
              private formBuilder: FormBuilder,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      name: ['', Validators.required],
      episodeId: ['', Validators.required],
      shortDescription: ['', [Validators.required]],
      description: [''],
      link: ['', [Validators.required]],
      guests: ['', [Validators.required]]
    });

    let id = null;
    this.route.queryParams.subscribe(params => {id = params['episodeId']; });

    this.episodeService.getEpisodeById(id).subscribe(data => {
      this.episode = data;
      this.setForm()
    });
    this.patronService.getPatronList().subscribe(data => {
      this.patronList = data;
    });
  }

  setForm() {
    this.postForm.patchValue({
      name: this.episode.name,
      episodeId: this.episode.id,
    });
  }

  get f() {
    return this.postForm.controls;
  }

  submitForm() {
    this.postForm.patchValue({
      guests: this.guests,
    });

    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    }

    this.postService.addPost(this.postForm.value)
      .subscribe(data => {
          this.postForm.reset()
          this.submitted = false;
          this.router.navigate([`post-details/${data.created}`]);
        },
        error => {
          this.submitted = false;
          console.error(error)
        });
  }

  addGuest() {
    this.guests.push(this.postForm.controls['guests'].value);
    this.postForm.controls['guests'].reset()
  }

  removeGuest(index) {
    this.guests.splice(index, 1);
  }

}

