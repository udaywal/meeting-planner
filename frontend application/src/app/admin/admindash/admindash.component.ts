import { Component, ViewChild, TemplateRef, OnInit} from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';

import { MainService } from 'src/app/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies';
import { SocketService } from 'src/app/socket.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#7c2ae8',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})

export class AdmindashComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [];

  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = false;

  
  public authToken: any;
  public userDetails: any;
  public activeUserType;
  public activeUserId;
  public activeUserName;
  public userList: any[] = [];
  public selectedUser;

  public userMeetings=[];
  public inviteeName;
 
  public events: CalendarEvent[] = [];

  constructor(
    public mainService:MainService, public route:ActivatedRoute, 
    public router:Router, public toastr:ToastrService, 
    private modal: NgbModal, public socketService:SocketService) {}

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.activeUserType = Cookie.get('activeUserType');
    this.activeUserId = Cookie.get('activeUserId');
    this.activeUserName = Cookie.get('activeUserName');
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

  public createNewMeeting () {
    this.router.navigate(['/meeting/create']);
  }

  public logout () {
    let activeUserData = {
      activeUserId: this.activeUserId
    }
    this.mainService.logout(activeUserData).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          Cookie.delete('authToken');
          Cookie.delete('activeUserType');
          Cookie.delete('activeUserId');
          Cookie.delete('activeUserName');
          this.toastr.success(apiResponse.message)
          this.router.navigate(['/']);
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        this.router.navigate(['/server-error'])
      }
    )
  }

  public getMeetingsOfUser(user) {
    this.selectedUser = user;
    this.mainService.getMeetingsOfUser(user.userId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          this.userMeetings = apiResponse.data;

          for(let meetingEvent of this.userMeetings){
            meetingEvent.title = meetingEvent.meetingName,
            meetingEvent.start = new Date(meetingEvent.meetingStartTime),
            meetingEvent.end = new Date(meetingEvent.meetingEndTime),
            meetingEvent.venue = meetingEvent.meetingVenue,
            meetingEvent.color = colors.blue,
            meetingEvent.action = this.actions
          }
          this.events = this.userMeetings
          this.refresh.next();
          this.toastr.success(apiResponse.message)
        } else if(apiResponse.status == 404){
          this.toastr.warning(apiResponse.message);
        } else {
          this.toastr.error(apiResponse.message)
          this.events = [];
        }
      }, (err) => {
        this.toastr.error('Something went wrong!')
        this.router.navigate(['/server-error'])
      }
    )
  }

  public deleteMeeting (meeting) {
    let meetingIdData = {
      meetingId: meeting.meetingId
    }
    this.mainService.deleteMeeting(meetingIdData).subscribe(
      (apiResponse) => {
        if( apiResponse.status === 200 ){
          this.toastr.success(apiResponse.message)

          let notificationData = {
            message: `Hello, ${this.activeUserName} has cancelled your meeting nameed ${meeting.meetingName}. Please Check your Calendar/Email`,
            userId: meeting.inviteeId
          }
          this.notifyUpdatesToUser(notificationData);
          
          this.getMeetingsOfUser(meeting.inviteeId);

        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        this.router.navigate(['/server-error'])
      }
    )
  }

  public notifyUpdatesToUser (notificationData) {
    this.socketService.notifyUpdate(notificationData);
  }

  public updateMeeting (meeting) {
    this.router.navigate([`/meeting/update/${meeting.meetingId}`])
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = false;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart,
    event.end = newEnd
    this.handleEvent('Dropped or Resized',event)
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
    this.refresh.next();
  }

  setView(view: CalendarView) {
    this.view = view;
    this.refresh.next();
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}