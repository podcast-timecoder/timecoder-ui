import { Component, OnInit } from '@angular/core';
import {Post} from "../model/post";
import {PostService} from "../service/post.service";
import {DomSanitizer} from "@angular/platform-browser";
import {EpisodeService} from "../service/episode.service";
import {Episode} from "../model/episode";
import {PatronService} from "../service/patron.service";
import {PatronList} from "../model/patron.list";
import {ActivatedRoute, Router} from '@angular/router';
import {LoggedUserService} from "../service/logged-user.service";
import {User} from "../model/user";


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Post;
  episode: Episode;
  patronList: PatronList;
  currentUser: User;

  constructor(private postService: PostService,
              private episodeService: EpisodeService,
              private patronService: PatronService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public sanitizer: DomSanitizer,
              private sessionUserService: LoggedUserService) { }

  ngOnInit() {
    const id = + this.activatedRoute.snapshot.paramMap.get('id');
    this.postService.getPostById(id).subscribe(data => {
      this.post = data['post'];
      this.episode = data['episode'];
      this.patronList = data['patrons'];
    });

    this.currentUser = this.sessionUserService.getSessionUser()
  }

  getPatrons(): string {
    return this.patronList.patrons.map(it => it.fullName).join(", ")
  }

  editPost() {
    const id = + this.activatedRoute.snapshot.paramMap.get('id');
    this.router.navigate(['post-edit/' + id]);
  }
}
