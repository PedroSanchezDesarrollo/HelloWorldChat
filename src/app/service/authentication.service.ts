import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public firebaseAuth:AngularFireAuth) { }

  async signup(email:string, password:string){
    try{
      const result = await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
      return result;
    }catch(error){
      console.log(error);
      return false;
    }
  }

  async login(email:string, password:string){
    try{
      const result = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
      return result;
    }catch(error){
      console.log(error);
      return false;
    }
  }

  getCurrentuser(){
    return this.firebaseAuth.authState.pipe(first()).toPromise();
  }

  async logout(){
    try{
      await this.firebaseAuth.signOut();
    }catch(error){
      console.log(error);
      return false;
    }
  }
}
