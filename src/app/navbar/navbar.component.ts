import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public user$: Observable<any> = this.firebaseAuth.firebaseAuth.user;
  constructor(private firebaseAuth: AuthenticationService, private router:Router) { }

  async onLogout(){
    try{
      await this.firebaseAuth.logout();
      this.router.navigate(["/login"]);
    }catch(error){
      console.log(error);
    }
  }
}
