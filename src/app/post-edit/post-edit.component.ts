import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Episode} from "../model/episode";
import {EpisodeService} from "../service/episode.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PatronService} from "../service/patron.service";
import {PostService} from "../service/post.service";
import {Post} from "../model/post";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  postForm: FormGroup;
  episode: Episode;
  post: Post;
  submitted = false;
  guests: Array<string> = [];

  constructor(private episodeService: EpisodeService,
              private route: ActivatedRoute,
              private patronService: PatronService,
              private formBuilder: FormBuilder,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      id: [],
      episodeId: [],
      createdAt: [],
      name: ['', Validators.required],
      shortDescription: ['', [Validators.required]],
      description: [''],
      link: ['', [Validators.required]],
      guests: ['', [Validators.required]]
    });

    const postId = +this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(postId).subscribe(data => {
      this.post = data['post'];
      this.episode = data['episode'];
      this.guests = this.post.guests
      this.setForm();
    });
  }

  setForm() {
    this.postForm.patchValue({
      id: this.post.id,
      episodeId: this.post.episodeId,
      name:    this.post.name,
      createdAt: this.post.createdAt,
      shortDescription:    this.post.shortDescription,
      description:    this.post.description,
      link:    this.post.link,
    });
  }

  get f() { return this.postForm.controls; }

  submitForm() {
    this.postForm.patchValue({
      guests: this.guests,
    });

    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    }


    this.postService.updatePost(this.post.id, this.postForm.value)
      .subscribe(data => {
          this.postForm.reset()
          this.submitted = false;
          this.router.navigate([`post-details/${this.post.id}`]);
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

  cancel() {
    this.router.navigate(['post-details/' + this.post.id]);
  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe(data => {
      this.router.navigate(['home']);
    })
  }
}
