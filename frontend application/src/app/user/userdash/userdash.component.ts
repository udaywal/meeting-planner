import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
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
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css']
})
export class UserdashComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('modalAlert') modalAlert: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = false;


  public authToken: any;
  public userDetails: any;
  public activeUserType;
  public activeUserId;
  public activeUserName;
  public userMeetings=[];

  public events: CalendarEvent[] = [];
  public actions: CalendarEventAction[] = [];

  public isReminderSnooze: boolean = true;

  constructor (
    public mainService:MainService, public route:ActivatedRoute, public socketService:SocketService,
    public router:Router, public toastr:ToastrService, private modal: NgbModal
    ) {}
    
  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.activeUserType = Cookie.get('activeUserType');
    this.activeUserId = Cookie.get('activeUserId');
    this.activeUserName = Cookie.get('activeUserName');
    this.getMeetingsOfUser(this.activeUserId)

    // meeting reminder for every 5 second

      setInterval(() => {
        this.meetingReminder()
      }, 10000)

  }

  public getMeetingsOfUser(activeUserId) {
    this.mainService.getMeetingsOfUser(activeUserId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          this.userMeetings = apiResponse.data;

          for(let meetingEvent of this.userMeetings){
            meetingEvent.title = meetingEvent.meetingName,
            meetingEvent.start = new Date(meetingEvent.meetingStartTime),
            meetingEvent.end = new Date(meetingEvent.meetingEndTime),
            meetingEvent.color = colors.blue,
            meetingEvent.action = this.actions,
            meetingEvent.remindMe = true
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

  public meetingReminder() {
    console.log('meeting reminder called!')
    let currentTime = new Date().getTime();
    for (let meetingEvent of this.userMeetings) {
      if(isSameDay(meetingEvent.start, currentTime) && new Date(meetingEvent.start).getTime() - currentTime <= 60000){
        if (this.isReminderSnooze) {
          console.log('meeting is on!')
          this.isReminderSnooze = false;
          this.modal.open(this.modalAlert, { size: 'lg' });
          break;
        }
      }
    }
  }

  public snoozeModalAlert(): void {
    // funtion called when meeting reminder snoozed
    this.isReminderSnooze = true;
  }

  public dismissModalAlert(): void {
    // funtion called when meeting reminder snoozed
    this.isReminderSnooze = false;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
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