import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  userUid: string;
  userUpdate = new User();

  updateUserSetting = new FormGroup({
    email: new FormControl(''),
    alias:new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    birthdate: new FormControl(''),
    sex: new FormControl('')
  });

  constructor(private router:Router, private userService: UserService, private messageService: MessageService) {
    this.userUid = sessionStorage.getItem("userUid");
    this.userService.getUser(sessionStorage.getItem('userUid'))
      .snapshotChanges()
      .subscribe(item => {
        if(item.length !== 0){
          let userJson = item[0].payload.toJSON();
          userJson["$key"] = item[0].key;
          this.userUpdate = userJson as User;
        }
      });
  }

  ngOnInit(): void {
  }

  async onUpdate(){
    let userLogged = new User();
    const {email, alias, name, surname, birthdate, sex} = this.updateUserSetting.value;

    let stringJsonValuesUpdate = '{';
    if(alias !== ""){
      if(stringJsonValuesUpdate === '{'){
        stringJsonValuesUpdate = stringJsonValuesUpdate + '"alias":"' + alias + '"';
      }else{
        stringJsonValuesUpdate = stringJsonValuesUpdate + ', "alias":"' + alias + '"';
      }
    }
    if(name !== ""){
      if(stringJsonValuesUpdate === '{'){
        stringJsonValuesUpdate = stringJsonValuesUpdate + '"name":"' + name + '"';
      }else{
        stringJsonValuesUpdate = stringJsonValuesUpdate + ', "name":"' + name + '"';
      }
    }
    if(surname !== ""){
      if(stringJsonValuesUpdate === '{'){
        stringJsonValuesUpdate = stringJsonValuesUpdate + '"surname":"' + surname + '"';
      }else{
        stringJsonValuesUpdate = stringJsonValuesUpdate + ', "surname":"' + surname + '"';
      }
    }
    if(birthdate !== ""){
      if(stringJsonValuesUpdate === '{'){
        stringJsonValuesUpdate = stringJsonValuesUpdate + '"birthdate":"' + birthdate + '"';
      }else{
        stringJsonValuesUpdate = stringJsonValuesUpdate + ', "birthdate":"' + birthdate + '"';
      }
    }
    if(sex !== ""){
      if(stringJsonValuesUpdate === '{'){
        stringJsonValuesUpdate = stringJsonValuesUpdate + '"sex":"' + sex + '"';
      }else{
        stringJsonValuesUpdate = stringJsonValuesUpdate + ', "sex":"' + sex + '"';
      }
    }

    stringJsonValuesUpdate = stringJsonValuesUpdate + '}';

    if(stringJsonValuesUpdate !== '{}'){
      let jsonValuesUpdate = JSON.parse(stringJsonValuesUpdate);

      this.userService.updateUser(this.userUpdate.$key, jsonValuesUpdate)
      .catch(err => console.log(err));

      if(alias !== ""){
        sessionStorage.removeItem('alias');
        sessionStorage.setItem('alias', alias);

        this.messageService.getMessagesFromUser(this.userUpdate.userUid)
        .snapshotChanges()
        .subscribe(item => {
          item.forEach(element => {
            let x = element.payload.toJSON();
            this.messageService.updateMessage(element.key, {alias: alias})
          })
        });
      }
    }
    this.router.navigate(['/']);
  }
}
