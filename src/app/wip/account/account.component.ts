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
  editForm: EditUser = null;
  constructor(private wipService: WipService) { }

  ngOnInit() {
    this.user = this.wipService.currentLoggedUser.value;
    console.log(this.user);
  }

  onSubmit(registerForm: RegisterForm) {
    delete registerForm.password;
    delete registerForm.password_confirmation;
    this.editForm = registerForm;
    this.editForm.uuid = this.user.uuid;
    console.log(this.editForm);
  }
  // TODO: edit user finish
}
