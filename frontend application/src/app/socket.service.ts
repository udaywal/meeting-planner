import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Cookie } from 'ng2-cookies'

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  public url = 'http://api.hiringadda.online';
  private socket;
  public userId

  constructor() {
      // that handshake
      this.socket = io(this.url);
      this.userId = Cookie.get('activeUserId');
      this.socket.on(this.userId, (data) => {
        alert(data.message);
      });
   }

   // emiting while create/update/delete happens
   public notifyUpdate(data) {
    this.socket.emit('meeeting-notifications', data);
  }

}