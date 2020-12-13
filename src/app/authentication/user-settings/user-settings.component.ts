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
  userUpdate = new User();

  updateUserSetting = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    alias:new FormControl('')
  });

  constructor(private router:Router, private userService: UserService) {
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
    const {email, password, alias} = this.updateUserSetting.value;
    const valuesToUpdate = {
      alias: alias
    };

    this.userService.updateUser(this.userUpdate.$key, valuesToUpdate)
    .catch(err => console.log(err));

    sessionStorage.removeItem('alias');
    sessionStorage.setItem('alias', alias);

    this.router.navigate(['/']);
  }
}
