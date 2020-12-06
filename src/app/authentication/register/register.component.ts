import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  async onRegister(){
    const {email, password} = this.registerForm.value;
    try{
      const user = await this.authService.signup(email, password);
      this.router.navigate(["/"]);
    }catch(error){
      console.log(error);
    }
  }
}

