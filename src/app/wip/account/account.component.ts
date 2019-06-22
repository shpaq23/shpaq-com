import {Component, OnInit} from '@angular/core';
import {User} from '../interfaces/user';
import {WipService} from '../../api/services/wip.service';
import {RegisterForm} from '../interfaces/register-form';
import {EditUser} from '../interfaces/edit-user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User;
  details = true;
  loading: boolean;
  submitted: boolean;
  editForm: EditUser = null;
  serverErrors = false;
  editSuccess = false;
  constructor(private wipService: WipService) { }

  ngOnInit() {
    this.user = this.wipService.currentLoggedUser.value;
    console.log(this.user);
  }

  toEdit() {
    this.editSuccess = false;
    this.details = false;
  }

  onSubmit(registerForm: RegisterForm) {
    delete registerForm.password;
    delete registerForm.password_confirmation;
    this.editForm = registerForm;
    this.editForm.uuid = this.user.uuid;
    console.log(this.editForm);
    this.editUser();
  }

  editUser() {
    this.loading = true;
    this.wipService.editUser(this.editForm)
      .subscribe({
        next: value => {
          this.user = value.data;
          this.loading = false;
          this.submitted = false;
          this.wipService.updateCurrentLoggedUser(this.user);
          this.editSuccess = true;
          this.details = true;
        }
      });
  }
}
