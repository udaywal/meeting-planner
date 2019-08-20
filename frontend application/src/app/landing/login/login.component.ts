import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/main.service';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;

  constructor(
    public router:Router, public toastr:ToastrService, 
    public mainService:MainService
    ) { }

  ngOnInit() {
  }

  public gotosignup () {
    this.router.navigate(['/signup']);
  }

  public loginFunction () {
    if (!this.email) {
      this.toastr.warning('Oops! email is missing!');
    } else if (!this.password) {
      this.toastr.warning('Oops! password is missing!');
    } else {

      let loginData = {
        email: this.email,
        password: this.password
      }

      this.mainService.loginFunction(loginData).subscribe(

        (apiResponse) => {
          if (apiResponse.status === 200) {
            
            this.toastr.success(apiResponse.message)
            Cookie.deleteAll();
            let userType = apiResponse.data.userDetails.isAdmin? 'admin':'user';
            Cookie.set('authToken', apiResponse.data.authToken);
            Cookie.set('activeUserType', userType);
            Cookie.set('activeUserId', apiResponse.data.userDetails.userId);
            Cookie.set('activeUserName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
            this.mainService.setUserInfoInLocalStorage(apiResponse.data.userDetails);

            if(apiResponse.data.userDetails.isAdmin){
              this.router.navigate(['/admin/admindash'])
            } else {
              this.router.navigate(['/user/userdash'])
            }

          } else {
            this.toastr.error(apiResponse.message)
          }
        }, (err) => {
          this.toastr.error('Something went wrong!')
        }

      )

    }
  }

  public forgotPassword () {
    this.router.navigate(['/forgotpassword'])
  }

}
