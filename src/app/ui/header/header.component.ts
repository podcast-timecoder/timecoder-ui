import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addEpisode(): void {
    this.router.navigate(['add-episode']);
  };

  goHome(): void {
    this.router.navigate(['episode-list']);
  }
}
