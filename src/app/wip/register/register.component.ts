import { Component, OnInit } from '@angular/core';
import {WipService} from '../../api/services/wip.service';
import {RegisterForm} from '../interfaces/register-form';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  serverErrors = null;

  constructor(private wipService: WipService,
              private router: Router) { }

  ngOnInit() {
  }


  submitForm(form: RegisterForm) {
    this.wipService.register(form)
      .subscribe({
        complete: () => {
          this.router.navigate(['/wip/login'], {queryParams: {success: 'registered'}});
        },
        error: () => {
          this.serverErrors = true;
        }
      });
  }
}
