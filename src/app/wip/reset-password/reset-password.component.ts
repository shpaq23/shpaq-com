import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WipService} from '../../api/services/wip.service';
import {ResetPassword} from '../interfaces/reset-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;
  submitted = false;
  invalid = false;
  serverErrors: string;
  loading = false;
  token: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private wipService: WipService) { }

  ngOnInit() {
    this.form = new FormGroup({
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]}),
      password_confirmation: new FormControl('', {validators: [Validators.required]})
    }, {validators: [this.checkPasswords]});
    this.returnUrl = '/wip/login';
    this.token = this.route.snapshot.queryParams.token;
    if (!this.token || this.token.length !== 32) {
      this.router.navigate(['/wip/login']);
    }
  }

  checkPasswords(group: FormGroup) {
    return group.controls.password.value === group.controls.password_confirmation.value
      ? null : {checkPasswords: {valid: false}};
  }
  get formValue(): ResetPassword {
    return {password: this.form.controls.password.value,
      password_confirmation: this.form.controls.password_confirmation.value,
      token: this.token};
  }
  setInvalid() {
    this.invalid = true;
    setTimeout(() => {
      this.invalid = false;
    }, 500);
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.setInvalid();
      return;
    }
    this.loading = true;

    this.wipService.resetPasswordStep2(this.formValue)
      .subscribe({
        complete: () => {
          this.router.navigate([this.returnUrl], {queryParams: {success: 'resetpassword'}});
          },
        error: err => {
          this.serverErrors = err;
          this.setInvalid();
          this.loading = false;
        }
      });
  }

}
