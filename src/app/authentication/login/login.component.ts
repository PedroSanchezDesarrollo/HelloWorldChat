import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

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

  constructor(private authService: AuthenticationService, private router:Router) { }

  async ngOnInit(){
    console.log('Prueba datos usuarios');
    const user = await this.authService.getCurrentuser();
    if(user){
      console.log('User', user);
    }else{
      console.log("No ha introducido correctamente las credenciales");
    }
  }

  async onLogin(){
    const {email, password} = this.loginForm.value;
    try{
      const user = await this.authService.login(email, password);
      if(user){
        this.router.navigate(["/"]);
      }
    }
    catch(error){
      console.log(error);
    }
  }
}
