import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {WipService} from '../../api/services/wip.service';
import {ActivatedRoute, PRIMARY_OUTLET, Router, UrlSegmentGroup, UrlTree} from '@angular/router';
import {User} from '../interfaces/user';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-wip',
  templateUrl: './wip.component.html',
  styleUrls: ['./wip.component.css']
})
export class WipComponent implements OnInit {

  loggedUser: User = null;
  loaded = false;
  isAdmin = false;
  childLoading = false;
  navbar: {name: string, href: string, external: boolean, selected: boolean}[] = [];
  constructor(private title: Title,
              private wipService: WipService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
              this.navbar = [
                {name: 'Account', href: 'account', external: false, selected: false},
                {name: 'Admin', href: 'admin', external: false, selected: false},
                {name: 'Logout', href: 'logout', external: false, selected: false},
              ]; }

  ngOnInit() {
    this.title.setTitle('WiP');
    this.activatedRoute.data
      .subscribe({
        next: value => {
          this.loggedUser = value.user.data;
          this.isAdmin = this.loggedUser.isAdmin;
          if (!this.isAdmin) {
            this.navbar.splice(1, 1);
            this.onRouteActivate();
          }
          this.wipService.currentLoggedUser = new BehaviorSubject<User>(this.loggedUser);
          setTimeout(() => {
            this.loaded = true;
          }, 100 );
        }
      });
    if (this.loaded) {
      this.wipService.currentLoggedUser.asObservable().subscribe({
        next: value => {
          this.loggedUser = value;
        }
      });
    }
  }
  get currentUrl(): string {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    return g && g.segments[1] ? g.segments[1].path : '';
  }
  onRouteActivate() {
    this.navbar[0].selected = this.navbar[0].href === this.currentUrl;
    setTimeout(() => {
      if (this.isAdmin) {
        this.navbar[1].selected = this.navbar[1].href === this.currentUrl;
      }
    }, 10);
    this.childLoading = false;
  }



}
