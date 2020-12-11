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

  constructor(private firebase: AngularFireDatabase) {}

  getUsers(){
    return this.firebase.list('users');
  }

  getUser(userUid: string){
    return this.firebase.list('users', ref => ref.orderByChild('userUid').equalTo(userUid));
  }

  insertUser(newUser: User){
    this.userList = this.getUsers();
    this.userList.push({
      userUid: newUser.userUid,
      email: newUser.email,
      alias: newUser.alias
    });
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.userList.update(key, value);
  }
}
