import { Message } from  '../models/message'
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageList: AngularFireList<any>;

  constructor(private firebase:AngularFireDatabase) {
    this.messageList = this.getMessages();
  }

  getMessages(){
    this.messageList = this.firebase.list('messages');
    return this.messageList;
  }

  getMessagesFromUser(userUid: string){
    return this.firebase.list('messages', ref => ref.orderByChild('userUid').equalTo(userUid));
  }

  insertMessage(newMessage: Message){
    this.messageList.push({
      userUid: newMessage.userUid,
      alias: newMessage.alias,
      message: newMessage.message,
      fechaHora: newMessage.fechaHora
    });
  }

  updateMessage(key: string, value: any): Promise<void> {
    return this.messageList.update(key, value);
  }
}
