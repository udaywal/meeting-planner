import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies';
import { MainService } from 'src/app/main.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-create-meet',
  templateUrl: './create-meet.component.html',
  styleUrls: ['./create-meet.component.css']
})
export class CreateMeetComponent implements OnInit {

  public meetingName;
  public meetingStartTime;
  public meetingEndTime;
  public meetingVenue;

  public authToken;
  public activeUserType;
  public activeUserId;
  public userDetails;
  public inviterName: String;
  public inviteeName: String;

  public userList: any[] = [];
  public meetingMember;

  constructor(public mainService:MainService, public socketService:SocketService,
     public router:Router, public toastr:ToastrService) { }

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.activeUserType = Cookie.get('activeUserType');
    this.activeUserId = Cookie.get('activeUserId');
    this.inviterName = Cookie.get('activeUserName');
    this.userDetails = this.mainService.getUserInfoFromLocalstorage();
    this.getAllUsers();
  }

  public getAllUsers () {
    this.mainService.getAllUsers().subscribe(
      (apiResponse) => {
        if(apiResponse.status === 200){
          this.userList = apiResponse.data
          this.toastr.success(apiResponse.message)
        } else if (apiResponse.status === 404) {
          this.toastr.warning(apiResponse.message)
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err)=> {
        this.toastr.error('Something went wrong!')
        this.router.navigate(['/server-error'])
      }
    )
  }

  public validateDate(startDate:any, endDate:any):boolean {

    let start = new Date(startDate);
    let end = new Date(endDate);
 
    if(end < start) {
      return true;
    }
    else{
      return false;
    }

  }

  public selectedUser=(user)=>{
    console.log(user)
    this.meetingMember = user
    this.inviteeName = user.firstName + ' ' + user.lastName;
  }

  public createMeeting() {

    if(!this.meetingName){
      this.toastr.warning('Oops! Please put meeting name!');
    } else if (!this.inviterName){
      this.toastr.warning('No meetings without inviter!');
    } else if (!this.inviteeName){
      this.toastr.warning('No meetings without invites!');
    } else if (!this.meetingStartTime){
      this.toastr.warning('Say when you want to start your meeting!');
    } else if (!this.meetingEndTime){
      this.toastr.warning('Say when you want to end your meeting!');
    } else if (!this.meetingVenue){
      this.toastr.warning('Oops! Please put meeting venue!');
    } else {
      let newMeetingData = {
        meetingName: this.meetingName,
        inviterName: this.inviterName,
        inviteeName: this.inviteeName,
        meetingStartTime: this.meetingStartTime,
        meetingEndTime: this.meetingEndTime,
        meetingVenue: this.meetingVenue,
        inviteeId: this.meetingMember.userId,
        inviteeEmail: this.meetingMember.email,
        inviterId: this.activeUserId,
        inviterEmail: this.userDetails.email
      }
      this.mainService.createMeeting(newMeetingData).subscribe(
        (apiResponse) => {
          if(apiResponse.status === 200 ) {
            this.toastr.success(apiResponse.message);

            let notificationData = {
              message: 
              `Hello, ${this.inviterName} has scheduled a meeting named "${this.meetingName}". 
              Please Check your Calendar & Email.`,
              userId: this.meetingMember.userId
            }
            this.notifyUpdatesToUser(notificationData);

            setTimeout(()=>{
              this.router.navigate(['/admin/admindash'])
            }, 2000)
          } else {
            this.toastr.error(apiResponse.message)
          }
        }, (err) => {
          this.toastr.error('Something went wrong!')
          this.router.navigate(['/server-error'])
        }
      )
    }

  }

  public notifyUpdatesToUser (notificationData) {
    this.socketService.notifyUpdate(notificationData);
  }

  public goToAdminDashboard() {
    this.router.navigate(['/admin/admindash'])
  }

}
