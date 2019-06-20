import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WipService} from '../../api/services/wip.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;
  submitted = false;
  invalid = false;
  serverErrors = false;
  loading = false;
  success = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private wipService: WipService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]})
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/wip';
  }
  get formValue() {
    return this.form.controls.email.value;
  }
  setInvalid() {
    this.invalid = true;
    setTimeout(() => {
      this.invalid = false;
    }, 500);
  }
  onSubmit() {
    this.serverErrors = false;
    this.submitted = true;
    if (this.form.invalid) {
      this.setInvalid();
      return;
    }
    this.loading = true;
    this.wipService.resetPasswordStep1(this.formValue)
      .subscribe({
        complete: () => { this.success = true; this.loading = false; },
        error: () => {
          this.serverErrors = true;
          this.setInvalid();
          this.loading = false;
        }
      });
  }

}
