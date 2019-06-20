import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WipService} from '../../api/services/wip.service';
import {LoginCredentials} from '../interfaces/login-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;
  submitted = false;
  invalid = false;
  serverErrors: string;
  loading = false;
  resetPassword = false;
  registered = false;
  inactive = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private wipService: WipService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email], updateOn: 'change'}),
      password: new FormControl('', {validators: [Validators.required], updateOn: 'change'})
    }, {updateOn: 'submit'});
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/wip';
    this.resetPassword = this.route.snapshot.queryParams.success === 'resetpassword';
    this.registered = this.route.snapshot.queryParams.success === 'registered';
  }
  get formValue(): LoginCredentials {
    return this.form.getRawValue();
  }
  setInvalid() {
    this.invalid = true;
    setTimeout(() => {
      this.invalid = false;
    }, 500);
  }

  onSubmit() {
    this.serverErrors = null;
    this.submitted = true;
    if (this.form.invalid) {
      this.setInvalid();
      return;
    }
    this.loading = true;
    this.wipService.login(this.formValue)
      .subscribe({
        complete: () => { this.router.navigate([this.returnUrl]); },
        error: err => {
          this.serverErrors = err;
          console.log(err);
          this.inactive = err.toString().includes('inactive');
          this.setInvalid();
          this.loading = false;
        }
      });
  }

}
