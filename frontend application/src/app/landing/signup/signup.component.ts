import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  public firstName: string;
  public lastName: string;
  public email: string;
  public mobile: string;
  public password: string;
  public isAdmin: boolean = false;

  public selectCountry: any;
  public countryList: any[] = [];
  public countryName: string;
  public countryCode: string;
  public countryCodes: string[];

  constructor(
    public router: Router, public toastr: ToastrService, 
    public mainService: MainService
    ) { }

  ngOnInit() {
    this.getCountries()
    this.getCountryCodes();
  }

  public getCountries() {
    this.mainService.getCountries()
      .subscribe((assetResponse) => {
        for (let i in assetResponse) {
          let oneCountry = { 
            code: i,
            name: assetResponse[i] }
          this.countryList.push(oneCountry)
        }
        this.countryList = this.countryList.sort((first, second) => {
          return first.name.toUpperCase() < second.name.toUpperCase() ? -1 : (first.name.toUpperCase() > second.name.toUpperCase() ? 1 : 0);
        });
        this.selectCountry = 'IN';
      })
  }
  
  public getCountryCodes() {
    this.mainService.getCountryCodes()
      .subscribe((data) => {
        this.countryCodes = data;
        this.countryCode = this.countryCodes['IN'];
      })
  }

  public onCountryChange() {
    this.countryCode = this.countryCodes[this.selectCountry];
    this.countryName = this.countryList[this.selectCountry];
  }

  public gotologin() {
    this.router.navigate(['/login']);
  }

  public setUserName(event) {
    this.isAdmin = event
  }

  public signupFunction() {
    if (!this.firstName) {
      this.toastr.warning('Oops! first name is missing!')
    } else if (!this.lastName) {
      this.toastr.warning('Oops! last name is missing!')
    } else if (!this.email) {
      this.toastr.warning('Oops! email is missing!')
    } else if (!this.selectCountry) {
      this.toastr.warning('Oops! country is missing!')
    } else if (!this.mobile) {
      this.toastr.warning('Oops! mobile number is missing!')
    } else if (!this.password) {
      this.toastr.warning('Oops! password is missing!')
    } else {

      let signupData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        country: this.selectCountry,
        mobile: this.mobile,
        password: this.password,
        isAdmin: this.isAdmin
      }

      this.mainService.signupFunction(signupData).subscribe(

        (apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success(apiResponse.message);
            setTimeout(() => {
              this.gotologin();
            }, 2000);
          } else {
            this.toastr.error(apiResponse.message);
          }
        }, (err) => {
          this.toastr.error('Something went wrong!');
        }

      )
    }
  }

}
