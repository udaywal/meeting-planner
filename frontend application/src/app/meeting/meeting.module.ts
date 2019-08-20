import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMeetComponent } from './create-meet/create-meet.component';
import { UpdateMeetComponent } from './update-meet/update-meet.component';
import { FormsModule } from '@angular/forms';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CreateMeetComponent, UpdateMeetComponent],
  imports: [
    CommonModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FilterPipeModule,
    NgbModalModule.forRoot()
  ]
})

export class MeetingModule { }