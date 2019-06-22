import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../interfaces/user';
import {WipService} from '../../api/services/wip.service';
import {EditUser} from '../interfaces/edit-user';
import {RegisterForm} from '../interfaces/register-form';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit {

  chosenUser: User;
  loggedUser: User;
  users: User[];

  details = true;
  editForm: EditUser = null;
  serverErrors = false;
  editSuccess = false;
  loading: boolean;
  submitted: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private wipService: WipService) { }

  ngOnInit() {
    this.users = this.wipService.currentUsers.value;
    this.loggedUser = this.wipService.currentLoggedUser.value;
    this.route.paramMap.subscribe(params => {
      this.setChosenUser(params.get('uuid'));
    });
    if (this.loggedUser.uuid === this.chosenUser.uuid) {
      this.router.navigate(['/wip/account']);
    }
  }

  setChosenUser(uuid: string) {
    this.users.forEach(user => {
      if (user.uuid === uuid) {
        this.chosenUser = user;
      }
    });
  }
  updateUsers(editedUser: User) {
    const index = this.users.indexOf(this.chosenUser);
    this.users[index] = editedUser;
  }
  onSubmit(registerForm: RegisterForm) {
    delete registerForm.password;
    delete registerForm.password_confirmation;
    this.editForm = registerForm;
    this.editForm.uuid = this.chosenUser.uuid;
    this.editUser();
  }
  toEdit() {
    this.editSuccess = false;
    this.details = false;
  }

  editUser() {
    this.wipService.editUser(this.editForm)
      .subscribe({
        next: value => {
          this.updateUsers(value.data);
          this.chosenUser = value.data;
          this.loading = false;
          this.submitted = false;
          this.wipService.updateCurrentUsers(this.users);
          this.editSuccess = true;
          this.details = true;
        }
      });
  }
}
