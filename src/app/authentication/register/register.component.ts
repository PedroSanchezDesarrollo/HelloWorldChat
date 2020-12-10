import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User = new User();

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    alias: new FormControl('')
  });

  constructor(private authService:AuthenticationService, private router:Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  async onRegister(){
    const {email, password, alias} = this.registerForm.value;

    let newUser = new User();

    try{
      const user = await this.authService.signup(email, password);

      //Cuando creo el usuario a la vez creo una instancia en la base de datos para guardar datos extra
      this.newUser.email = email;
      this.newUser.alias = alias;
      this.newUser.userUid = JSON.parse(JSON.stringify(user)).user.uid;

      this.userService.insertUser(this.newUser);
      localStorage.setItem('userLogged', JSON.stringify(this.newUser));

      this.router.navigate(["/"]);
    }catch(error){
      console.log(error);
    }
  }
}

