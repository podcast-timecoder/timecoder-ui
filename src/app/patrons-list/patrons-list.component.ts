import { Component, OnInit } from '@angular/core';
import {PatronList} from "../model/patron.list";
import {PatronService} from "../service/patron.service";

@Component({
  selector: 'app-patrons-list',
  templateUrl: './patrons-list.component.html',
  styleUrls: ['./patrons-list.component.css']
})
export class PatronsListComponent implements OnInit {

  patronList: PatronList;

  constructor(private patronService: PatronService) { }

  ngOnInit() {
    this.patronService.getPatronList().subscribe(data => {
      this.patronList = data;
      this.sortPatronsByAmount();
    });
  }

  sortPatronsByAmount(): void {
    this.patronList.patrons.sort(function(a, b){
      return b.amount - a.amount
    })
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
