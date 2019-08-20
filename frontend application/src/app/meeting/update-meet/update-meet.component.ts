import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-update-meet',
  templateUrl: './update-meet.component.html',
  styleUrls: ['./update-meet.component.css']
})
export class UpdateMeetComponent implements OnInit {

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

  public inviteeId

  public meetingId;

  constructor(
    public mainService: MainService, public route: ActivatedRoute,
    public router: Router, public toastr: ToastrService,
    public socketService:SocketService
  ) { }

  ngOnInit() {
    /*  This is the data of current logged in user so it not clear 
        that who is inviter at this time we are using meeting data! */
    /*     this.authToken = Cookie.get('authToken');
        this.activeUserType = Cookie.get('activeUserType');
        this.activeUserId = Cookie.get('activeUserId');
        this.inviterName = Cookie.get('activeUserName');
        this.userDetails = this.mainService.getUserInfoFromLocalstorage(); */
    this.meetingId = this.route.snapshot.paramMap.get('meetingId')
    this.getMeeting()
  }

  public getMeeting() {
    this.mainService.getMeeting(this.meetingId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.meetingName = apiResponse.data.meetingName
          this.meetingStartTime = apiResponse.data.meetingStartTime
          this.meetingEndTime = apiResponse.data.meetingEndTime
          this.meetingVenue = apiResponse.data.meetingVenue
          this.inviteeName = apiResponse.data.inviteeName
          this.inviterName = apiResponse.data.inviterName
          this.inviteeId = apiResponse.data.inviteeId
          this.toastr.success(apiResponse.message)
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('Something went wrong!')
        this.router.navigate(['/server-error'])
      }
    )
  }

  public updateMeeting() {

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
      let updateMeetingData = {
        meetingName: this.meetingName,
        meetingStartTime: this.meetingStartTime,
        meetingEndTime: this.meetingEndTime,
        meetingVenue: this.meetingVenue,
      }
      this.mainService.updateMeeting(updateMeetingData, this.meetingId).subscribe(
        (apiResponse) => {
          if(apiResponse.status === 200 ) {
            this.toastr.success(apiResponse.message);

            let notificationData = {
              message: 
              `Hello, 
              ${this.inviterName} has updated your meeting named "${this.meetingName}". 
              Please Check your Calendar & Email`,
              userId: this.inviteeId
            }
            this.notifyUpdatesToUser(notificationData);

            setTimeout(()=>{
              this.router.navigate(['/admin/admindash'])
            }, 5000)
          } else {
            this.toastr.error(apiResponse.message)
          }
        }, (err) => {
          this.toastr.error('Something went wrong!')
        }
      )
    }

  }

  public notifyUpdatesToUser (notificationData) {
    this.socketService.notifyUpdate(notificationData);
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

}
