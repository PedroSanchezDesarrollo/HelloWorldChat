import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
  });

  userLogged = new User();
  users: User[];

  constructor(private authService: AuthenticationService, private router:Router, private userService: UserService) { }

  async ngOnInit(){
    const user = await this.authService.getCurrentuser();
    if(user){
      console.log('User', user);
    }
  }

  async onLogin(){
    const {email, password} = this.loginForm.value;

    try{
      const user = await this.authService.login(email, password);
      let uidUser = JSON.parse(JSON.stringify(user)).user.uid;

      this.userService.getUser(uidUser)
      .snapshotChanges()
      .subscribe(item => {
        if(item.length !== 0){
          let userJson = item[0].payload.toJSON();
          userJson["$key"] = item[0].key;
          this.userLogged = userJson as User;
          console.log('userLogged', this.userLogged);
          sessionStorage.setItem('alias', this.userLogged.alias);
          sessionStorage.setItem('userUid', this.userLogged.userUid);
          this.router.navigate(["/"]);
        }
      });
    }
    catch(error){
      console.log(error);
    }
  }
}
