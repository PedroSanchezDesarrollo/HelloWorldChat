import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { element } from 'protractor';
import { Message } from '../models/message';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  messageForm = new FormGroup({
    message: new FormControl('')
  });

  userUid: string;
  userAlias: string;

  listaMensajes: Message[];

  constructor(private messageService: MessageService) {
    this.userAlias = sessionStorage.getItem("alias");
    this.userUid = sessionStorage.getItem("userUid");
  }

  ngOnInit(): void {
    this.messageService.getMessages()
    .snapshotChanges()
    .subscribe(item => {
      this.listaMensajes = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listaMensajes.push(x as Message);
      })
    });
  }

  sendMessage(){
    let message = new Message();
    message.alias = this.userAlias;
    message.message = this.messageForm.value.message;
    message.userUid = this.userUid;
    message.fechaHora = new Date().toLocaleString();

    this.messageService.insertMessage(message);

    this.messageForm.reset();
  }
}
