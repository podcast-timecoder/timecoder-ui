import { Component, OnInit } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'timecoder-ui';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private meta: Meta
              ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
  )
      .subscribe((data) => {
        if (data.metaDescription) {
          this.meta.updateTag({name: 'description', content: data.metaDescription});
          this.meta.updateTag({name: 'og:description', content: data.metaDescription});
          this.meta.removeTag('itemprop="description"');
          this.meta.updateTag({itemprop: 'description', content: data.metaDescription});
        }
      });
  }

}
