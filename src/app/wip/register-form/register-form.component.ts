import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
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
export class RegisterFormComponent implements OnChanges {

  @Output() registerForm = new EventEmitter<RegisterForm>();
  @Output() editUser = new EventEmitter<boolean>();
  @Input() type = 'register';
  @Input() user: User = null;
  @Input() admin: false;
  @Input() serverErrors = null;
  @Input() details = false;

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.details);
    this.positionSelected = 'tester';
    this.form = new FormGroup({
      first_name: new FormControl(this.user ? this.user.firstName : '',
        {validators: [Validators.required, Validators.maxLength(40)]}),
      last_name: new FormControl(this.user ? this.user.lastName : '',
        {validators: [Validators.required, Validators.maxLength(40)]}),
      email: new FormControl({value: this.user ? this.user.email : '', disabled: this.user || this.details},
        {validators: [Validators.required, Validators.email], updateOn: 'change'}),
      description: new FormControl(this.user ? this.user.description : ''),
      position: new FormControl(this.user ? this.user.position : this.positions[0].value,
        {validators: [Validators.required]}),
      specialization_field_1: new FormControl(this.user ? this.user.specializationField1 : '',
        {validators: [Validators.required, Validators.maxLength(255)]}),
      specialization_field_2: new FormControl(this.user ? this.user.specializationField2 : '',
        {validators: [Validators.required, Validators.maxLength(255)]}),
      checkbox: new FormControl({value: this.user ? this.user.checkbox : '', disabled: this.details})
    });
    if (this.details) {
      this.form.disable();
    } else {
      setTimeout(() => {
        if (!this.user) {
          this.form.get('email').setAsyncValidators(this.emailExist(this.wipService));
          this.form.addControl('passwords', new FormGroup({
            password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]}),
            password_confirmation: new FormControl('', {validators: [Validators.required]})
          }, {validators: [this.checkPasswords]}));
        }
        this.form.enable();
        this.form.get('email').disable();
      }, 20);
    }

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
    form.password = form.passwords && form.passwords.password;
    form.password_confirmation = form.passwords && form.passwords.password_confirmation;
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
