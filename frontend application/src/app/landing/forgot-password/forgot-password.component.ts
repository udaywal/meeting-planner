import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public email :String;

  constructor(
    public toastr:ToastrService, public mainService:MainService, 
    public router:Router
    ) { }

  ngOnInit() {
  }

  public forgotPassword() {
    if (!this.email) {
      this.toastr.warning('Oops! please put email!')
    } else {
      let userdata = {
        email: this.email
      }
      this.mainService.forgotPassword(userdata).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.toastr.success(apiResponse.message)
            setTimeout(()=>{
              this.router.navigate(['']);
            }, 5000)
          } else {
            this.toastr.error(apiResponse.message)
          }
        }, (err)=>{
          this.toastr.error('something went wrong!')
        }
      )
    }
  }

}
