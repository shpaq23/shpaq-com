import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../interfaces/user';
import {WipService} from '../../api/services/wip.service';
import {map, switchMap} from 'rxjs/operators';
import {timer} from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Output() registerForm = new EventEmitter<User>();
  @Input() type = 'register';
  form: FormGroup;
  submitted = false;
  invalid = false;
  serverErrors: string;
  loading = false;
  positions = [
    {name: 'Tester', value: 'tester'},
    {name: 'Developer', value: 'developer'},
    {name: 'Project Manager', value: 'project_manager'}
  ];
  positionSelected = 'tester';
  constructor(private wipService: WipService) { }

  ngOnInit() {
    this.form = new FormGroup({
      first_name: new FormControl('', {validators: [Validators.required, Validators.maxLength(40)]}),
      last_name: new FormControl('', {validators: [Validators.required, Validators.maxLength(40)]}),
      email: new FormControl('',
        {validators: [Validators.required, Validators.email], asyncValidators: [this.emailExist(this.wipService)], updateOn: 'blur'}),
      passwords: new FormGroup({
        password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]}),
        password_confirmation: new FormControl('', {validators: [Validators.required]})
      }, {validators: [this.checkPasswords]}),
      description: new FormControl(''),
      position: new FormControl(this.positions[0].value, {validators: [Validators.required]})
    });
  }
  emailExist(wipService: WipService, time: number = 500) {
    return (email: FormControl) => {
      return timer(time).pipe(
        switchMap(() => wipService.checkEmailAvailability(email.value)),
        map((data: {data: boolean, code: number, message: string}) => {
          return data.data ? null : {emailExist: true};
        })
      );
    };
  }
  checkPasswords(group: FormGroup) {
    return group.controls.password.value === group.controls.password_confirmation.value
      ? null : {checkPasswords: {valid: false}};
  }
  onSubmit() {
    console.log(this.form);
  }
}
