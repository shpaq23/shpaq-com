import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WipService} from '../../api/services/wip.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

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
  get formValue(): string {
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
    this.wipService.activateAccount(this.formValue)
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
