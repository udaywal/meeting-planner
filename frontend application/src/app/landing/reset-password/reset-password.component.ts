import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public password: string

  constructor(
    public router:Router, public toastr:ToastrService, 
    public route:ActivatedRoute, public mainService:MainService
    ) { }

  ngOnInit() {
  }

  public resetPassword () {
    if (!this.password) {
      this.toastr.warning('Oops! password is missing!')
    } else {
      let userData = {
        userId: this.route.snapshot.paramMap.get('userId'),
        password: this.password
      }
      this.mainService.resetPassword(userData).subscribe(
        (apiResponse)=>{
          if (apiResponse.status === 200){
            this.toastr.success(apiResponse.message)
            this.router.navigate([''])
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
