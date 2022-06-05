import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null)
      this.router.navigateByUrl("/home");
  }

  onSubmit(){
    this.service.login().subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.toastr.success("Login Successful");
        this.router.navigateByUrl('/home');
      },
      err => {
        if(err.status == 400){
          this.toastr.error("Invalid User Name Or Password")
        }
        else{
          console.log(err);
        }
      }
    )
    }  
    
}
