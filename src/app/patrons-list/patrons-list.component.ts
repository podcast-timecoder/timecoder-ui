import { Component, OnInit } from '@angular/core';
import {PatronList} from "../model/patron.list";
import {PatronService} from "../service/patron.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patrons-list',
  templateUrl: './patrons-list.component.html',
  styleUrls: ['./patrons-list.component.css']
})
export class PatronsListComponent implements OnInit {

  patronList: PatronList;

  constructor(private patronService: PatronService, private router: Router) { }

  ngOnInit() {
    this.patronService.getPatronList().subscribe(data => {
      this.patronList = data;
    });
  }

  transformPrice(val: number): number {
    return val/100;
  }

  isShow(val: number): boolean {
    return val >= 500
  }

  clearPatronsCaches() {
    this.patronService.clearPatronsCaches()
    window.location.reload();
  }

}
