import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  listaMensajes = [
      {
        "idUsuario": 0,
        "mensaje": "Hola soy Pedro, que tal estais?",
        "datetime": "2020-12-07 22:00:00"
      },
      {
        "idUsuario": 1,
        "mensaje": "Hola soy Pablo, que tal estais?",
        "datetime": "2020-12-07 22:01:00"
      },
      {
        "idUsuario": 0,
        "mensaje": "Encantado",
        "datetime": "2020-12-07 22:02:00"
      },
      {
        "idUsuario": 0,
        "mensaje": ":)",
        "datetime": "2020-12-07 22:02:00"
      },
      {
        "idUsuario": 2,
        "mensaje": "Holiiii",
        "datetime": "2020-12-07 22:04:00"
      }
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
