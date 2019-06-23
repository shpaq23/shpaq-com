import {Component, OnInit} from '@angular/core';
import {PRIMARY_OUTLET, Router, UrlSegmentGroup, UrlTree} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  childLoading = false;
  projects: {name: string, href: string, external: boolean, selected: boolean}[] = [];
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.projects = [
      {name: 'Wiedza i Praktyka', href: 'wip', external: false, selected: false},
      {name: 'Static Browser Game', href: 'https://wowproject.azureedge.net', external: true, selected: false}
    ];
  }

  get currentUrl(): string {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    return g ? g.segments[0].path : '';
  }
  onRouteActivate() {
    this.projects[0].selected = this.projects[0].href === this.currentUrl;
    this.childLoading = false;
  }
}
