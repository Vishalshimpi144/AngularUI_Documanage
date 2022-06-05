import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  readonly baseUri = "https://api-upload-document.herokuapp.com";

  formModel = this.fb.group({
    UserName:['', Validators.required],
    Email:['',[Validators.required, Validators.email]],
    FullName:['',Validators.required],
    Passwords: this.fb.group({
      Password:['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword:['',Validators.required],
    }, {validator: this.comparePasswords})

  });

  formLoginModel = this.fb.group({
    UserName:['', Validators.required],
    Password:['', [Validators.required, Validators.minLength(4)]],
    });

  comparePasswords(fb: FormGroup){
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    //PasswordsMismatched
    //confirmPasswordCtrl.errors={passwordsMismatched: true}
    if(confirmPasswordCtrl?.errors == null || 'passwordsMismatched' in confirmPasswordCtrl.errors){
      if(fb.get('Password')?.value != confirmPasswordCtrl?.value)
        confirmPasswordCtrl?.setErrors({passwordMismatched: true});
      else
      confirmPasswordCtrl?.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };

    //return this.http.post(this.baseUri+'/applicationuser/Register', body);
    return this.http.post(this.baseUri+'/applicationuser/Register', body);
  }

  login(){
    var body = {
      UserName: this.formLoginModel.value.UserName,
      Password: this.formLoginModel.value.Password
    };

    //return this.http.post(this.baseUri + '/applicationuser/login', body);
    return this.http.post(this.baseUri + '/login', body);
  }

  getUserProfile()
  {
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    return this.http.get(this.baseUri + "/userprofile", {headers: tokenHeader});
  }
}
