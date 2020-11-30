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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
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
  ]
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.validateForm();
  }

  validateForm() {
    this.formRegister = this.fb.group({
      nickname: ['', [Validators.required, Validators.maxLength(40), forbiddenName]],
      pw: this.fb.group({
        password: ['', [Validators.required, Validators.maxLength(40)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(40)]]
      }, {
        validators: comparePassword
      }),
      emailAddress: ['', [Validators.required, Validators.maxLength(40), Validators.email, forbiddenEmail]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(15)]],
      country: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.formRegister.invalid) {
      return;
    }

    this.hasServerError = false;
    this.formRegister.value.password = this.formRegister.value.pw.password;
    delete this.formRegister.value["pw"];
    this.userService.register(this.formRegister.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.autoLogin(this.formRegister.value.nickname, this.formRegister.value.password);
                },
                error => {
                  this.hasServerError = true;
                  this.errorMessage = error;
                });
  }

  autoLogin(userName, password) {
    this.authenticationService.login(userName, password)
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['/home']);
        },
        error => {
            this.router.navigate(['/login'], { queryParams: { registered: true }});
            console.log(error);
        });
  }

}
