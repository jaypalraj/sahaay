import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  email:string = 'jaypal@sahaay.com';
  password:string = 'test123';


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    
    this.authService.authenticateUser(this.email,this.password)
      .subscribe(u => {
        if(u.id > 0)
        {
          localStorage.user = JSON.stringify(u);
          this.router.navigate(['user-settings/profile']);
        }
      });

  }

}
