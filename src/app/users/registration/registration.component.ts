import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res: any) => {
        if(res.succeeded){
          this.service.formModel.reset();
        }
        else{
          res.errors.forEach((element:any) => {
            switch(element.code){
              case 'DuplicateUserName':
                //User name is allready taken
                break;
              default:
                //Registration is failed
                break;
            }
          });;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}