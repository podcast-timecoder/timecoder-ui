import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addEpisode(): void {
    this.router.navigate(['add-episode']);
  };

  goHome(): void {
    this.router.navigate(['episode-list']);
  }

  addTheme(): void {
    this.router.navigate(['add-theme']);
  }
}
