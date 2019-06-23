import {Component, OnInit} from '@angular/core';
import {User} from '../interfaces/user';
import {WipService} from '../../api/services/wip.service';
import {ActivatedRoute, PRIMARY_OUTLET, Router, UrlSegmentGroup, UrlTree} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];
  page = 1;
  loggedUser: User;
  collectionSize: number;
  pageSize = 2;
  childActivated = false;
  loading = false;
  chosenUuid: string = null;
  constructor(private wipService: WipService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.onRouteActivate();
    this.loggedUser = this.wipService.currentLoggedUser.value;
    this.activatedRoute.data
      .subscribe({
        next: value => {
          this.users = value.users.data;
          this.wipService.currentUsers = new BehaviorSubject<User[]>(this.users);
          this.collectionSize = this.users.length;
        }
      });
  }
  get currentUrl(): string {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    return g && g.segments[2] ? g.segments[2].path : '';
  }
  onRouteActivate() {
    this.childActivated = this.currentUrl === 'user';
  }
  findUserByUuid(uuid: string): User {
    let foundUser: User = null;
    this.users.forEach(user => {
      if (user.uuid === uuid) {
        foundUser = user;
        return;
      }
    });
    return foundUser;
  }
  updateUsers(user: User, uuid: string) {
    const index = this.users.indexOf(this.findUserByUuid(uuid));
    this.users[index] = user;
  }

  deleteUser(uuid: string) {
    this.chosenUuid = uuid;
    this.loading = true;
    this.wipService.deleteUser(uuid)
      .subscribe(value => {
        this.loading = false;
        this.updateUsers(value.data, uuid);
        this.wipService.updateCurrentUsers(this.users);
        this.chosenUuid = null;
      });
  }
  restoreUser(uuid: string) {
    this.chosenUuid = uuid;
    this.loading = true;
    this.wipService.restoreUser(uuid)
      .subscribe(value => {
        this.loading = false;
        this.updateUsers(value.data, uuid);
        this.wipService.updateCurrentUsers(this.users);
        this.chosenUuid = null;
      });
  }
  activateUser(uuid: string) {
    this.chosenUuid = uuid;
    this.loading = true;
    this.wipService.activateUser(uuid)
      .subscribe(value => {
        this.loading = false;
        this.updateUsers(value.data, uuid);
        this.wipService.updateCurrentUsers(this.users);
        this.chosenUuid = null;
      });
  }
  makeAdmin(uuid: string) {
    this.chosenUuid = uuid;
    this.loading = true;
    this.wipService.makeAdmin(uuid)
      .subscribe(value => {
        this.loading = false;
        this.updateUsers(value.data, uuid);
        this.wipService.updateCurrentUsers(this.users);
        this.chosenUuid = null;
      });
  }


}
