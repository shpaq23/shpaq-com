import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-wip',
  templateUrl: './wip.component.html',
  styleUrls: ['./wip.component.css']
})
export class WipComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('WiP');
  }

}
