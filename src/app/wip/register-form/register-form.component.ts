import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../interfaces/user';
import {WipService} from '../../api/services/wip.service';
import {map, switchMap} from 'rxjs/operators';
import {timer} from 'rxjs';
import {RegisterForm} from '../interfaces/register-form';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Output() registerForm = new EventEmitter<RegisterForm>();
  @Input() type = 'register';
  @Input() user: User = null;
  @Input() admin: false;
  @Input() serverErrors = null;

  form: FormGroup;
  submitted = false;
  invalid = false;
  loading = false;

  positions = [
    {name: 'Tester', value: 'tester'},
    {name: 'Developer', value: 'developer'},
    {name: 'Project Manager', value: 'project_manager'}
  ];
  positionMapper = {
   tester: {
     specialization_field_1: 'Testing Systems',
     specialization_field_2: 'Reporting Systems',
     checkbox: 'Knows Selenium',
   },
    developer: {
      specialization_field_1: 'IDE Environment',
      specialization_field_2: 'Programming Language',
      checkbox: 'Knows MySql',
    },
    project_manager: {
      specialization_field_1: 'Methodologies for Project Management',
      specialization_field_2: 'Reporting Systems',
      checkbox: 'Knows Scrum',
    }
  };
  positionSelected: string;
  constructor(private wipService: WipService) { }

  ngOnInit() {
    this.positionSelected = 'tester';
    this.form = new FormGroup({
      first_name: new FormControl('', {validators: [Validators.required, Validators.maxLength(40)]}),
      last_name: new FormControl('', {validators: [Validators.required, Validators.maxLength(40)]}),
      email: new FormControl('',
        {validators: [Validators.required, Validators.email], asyncValidators: [this.emailExist(this.wipService)],
          updateOn: 'change'}),
      passwords: new FormGroup({
        password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]}),
        password_confirmation: new FormControl('', {validators: [Validators.required]})
      }, {validators: [this.checkPasswords]}),
      description: new FormControl(''),
      position: new FormControl(this.positions[0].value, {validators: [Validators.required]}),
      specialization_field_1: new FormControl('', {validators: [Validators.required, Validators.maxLength(255)]}),
      specialization_field_2: new FormControl('', {validators: [Validators.required, Validators.maxLength(255)]}),
      checkbox: new FormControl('')
    });
  }
  emailExist(wipService: WipService, time: number = 1000) {
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
  changePosition(position: string) {
    this.form.get('specialization_field_1').setValue('');
    this.form.get('specialization_field_2').setValue('');
    this.form.get('checkbox').setValue('');
    this.positionSelected = position;
  }
  setInvalid() {
    this.invalid = true;
    setTimeout(() => {
      this.invalid = false;
    }, 500);
  }
  get formValue(): RegisterForm {
    const form = this.form.getRawValue();
    form.password = form.passwords.password;
    form.password_confirmation = form.passwords.password_confirmation;
    delete form.passwords;
    form.checkbox = form.checkbox.length !== 0;
    return form;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid || this.form.pending) {
      this.setInvalid();
      return;
    }
    this.loading = true;
    this.registerForm.emit(this.formValue);
  }
}
