import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  userUid: string;

  updateUserSetting = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    alias:new FormControl('')
  });

  constructor(private router:Router, private userService: UserService) {
    this.userUid = sessionStorage.getItem("userUid");
  }

  ngOnInit(): void {
  }

  async onUpdate(){
    const {email, password, alias} = this.updateUserSetting.value;

    let userUpdate = new User();
    userUpdate.userUid = this.userUid;
    userUpdate.alias = alias;

    try{
      this.userService.updateUser(userUpdate);
      sessionStorage.removeItem('alias');
      sessionStorage.setItem('alias', alias);
    }catch(error){
      console.log(error);
    }

    this.router.navigate(['/']);
  }

}
