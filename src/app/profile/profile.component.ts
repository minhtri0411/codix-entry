import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

export function forbiddenEmail(email: AbstractControl) {
  const emails = ["123@123.com"];
  if (emails.includes(email.value)) {
    return {invalidEmail: true};
  }

  return null;  
}

export function forbiddenName(userName: AbstractControl) {
  const userNames = ["tris"];
  if (userNames.includes(userName.value)) {
    return { invalidUserName: true };
  }

  return null;  
}

export function comparePassword(c: AbstractControl) {
  const itemForm = c.value;
  if (itemForm.password === itemForm.confirmPassword ) {
    return null;
  }

  return {passwordNotMatch  : true};
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  formProfile: FormGroup;
  hasServerError: Boolean = false;
  errorMessage: String = "";
  listCountry = [
    {
      name: "Ha Noi",
      code: 1
    },
    {
      name: "Da Nang",
      code: 2
    },
    {
      name: "Ho Chi Minh",
      code: 3
    }
  ];
  currentUser: any;
  isEdit: Boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.validateForm();
  }

  validateForm() {
    this.formProfile = this.fb.group({
      pw: this.fb.group({
        password: ['', [Validators.required, Validators.maxLength(40)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(40)]]
      }, {
        validators: comparePassword
      }),
      phoneNumber: ['', [Validators.required, Validators.maxLength(15)]],
      country: ['', [Validators.required]]
    });
  }

  showFormEdit(isShow) {
    this.isEdit = isShow;
  }

  onSubmit() {
    if (this.formProfile.invalid) {
      return;
    }

    this.hasServerError = false;
    this.formProfile.value.password = this.formProfile.value.pw.password;
    delete this.formProfile.value["pw"];
    Object.assign( this.currentUser, this.formProfile.value );

    this.userService.updateProfile(this.currentUser)
            .pipe(first())
            .subscribe(
                data => {
                  this.showFormEdit(false);
                },
                error => {
                  this.hasServerError = true;
                  this.errorMessage = error;
                });
  }

}
