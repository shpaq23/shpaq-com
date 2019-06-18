import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../api/services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;
  submitted = false;
  invalid = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.form = new FormGroup({
      password: new FormControl('', {validators: [Validators.required, this.validatePassword]})
    }, {updateOn: 'submit'});
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  get password(): string {
    return this.form.get('password').value;
  }

  validatePassword(c: FormControl) {
    const password = 'Alamakota1';
    return c.value === password ? null : {validatePassword: {valid: false}};
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.invalid = true;
      setTimeout(() => {
        this.invalid = false;
      }, 500);
      return;
    }
    this.authenticationService.login(this.password);
    this.router.navigate([this.returnUrl]);
  }
}
