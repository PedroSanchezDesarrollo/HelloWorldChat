import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {
    this.userList = this.getUsers();
  }

  getUsers(){
    return this.firebase.list('users');
  }

  getUser(userUid: string){
    return this.firebase.list('users', ref => ref.orderByChild('userUid').equalTo(userUid));
  }

  insertUser(newUser: User){
    this.userList.push({
      userUid: newUser.userUid,
      email: newUser.email,
      alias: newUser.alias,
      name: newUser.name,
      surname: newUser.surname,
      birthdate: newUser.birthdate,
      sex: newUser.sex,
    });
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.userList.update(key, value);
  }
}
