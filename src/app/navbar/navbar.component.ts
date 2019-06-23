import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarOpen = false;
  @Input() title = 'Projects';
  @Input() titleUrl = '/';
  @Input() projects: {name: string, href: string, external: boolean, selected: boolean}[];
  @Output() childClicked = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
