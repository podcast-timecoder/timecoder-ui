import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {Post} from "../model/post";
import {PostService} from "../service/post.service";
import {EpisodeService} from "../service/episode.service";
import {Episode} from "../model/episode";
import {PatronService} from "../service/patron.service";
import {PatronList} from "../model/patron.list";
import {ActivatedRoute, Router} from '@angular/router';
import {LoggedUserService} from "../service/logged-user.service";
import {User} from "../model/user";
import * as moment from 'moment';

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
  scWidget: any;

  constructor(private postService: PostService,
              private episodeService: EpisodeService,
              private patronService: PatronService,
              private activatedRoute: ActivatedRoute,
              private meta: Meta,
              private router: Router,
              private sessionUserService: LoggedUserService) {
  }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.postService.getPostById(id).subscribe(data => {
      this.post = data.post;
      this.episode = data.episode;
      this.patronList = data.patrons;
      this.initScWidget();
      // update meta tags for post
      this.meta.updateTag({name: 'description', content: data.post.shortDescription});
      this.meta.updateTag({name: 'og:description', content: data.post.shortDescription});
      this.meta.removeTag('itemprop="description"');
      this.meta.updateTag({itemprop: 'description', content: data.post.shortDescription});
      this.meta.updateTag({name: 'keyword', content: 'testing, automation, features, java, c#'}); // data.post.keywords
    });

    this.currentUser = this.sessionUserService.getSessionUser()
  }


  editPost() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.router.navigate(['post-edit/' + id]);
  }

  private initScWidget() {
      this.scWidget = window['SC'].Widget(document.querySelector('iframe'));
      this.scWidget.bind(window['SC'].Widget.Events.READY, function () {

      })
  }

  seekToTime(timeCode: string) {
    let m = moment(timeCode, ['HH:mm:ss']);
    let ms = m.milliseconds() + 1000 * (m.seconds() + 60 * (m.minutes() + 60 * m.hours()));
    this.scWidget.seekTo(ms);
    this.scWidget.play();
  }
}
