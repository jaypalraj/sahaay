import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from './models/IUser';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  navbarClass:string = '';
  authenticatedUser:IUser;
  isAuthenticated:boolean;

  constructor(private router: Router, private authService:AuthService) {
    
  }

  ngOnInit(){
    this.router.events.subscribe((res) => { 
      
      if(this.router.url.indexOf('/home') > -1){
        this.navbarClass = "navbar-dark fixed-top";  
      }
      else
      {
        this.navbarClass = "bg-light";
      }
    });    

    this.authenticatedUser = this.authService.getAuthenticatedUser();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  getUserInitials(){
    let firstName = this.authenticatedUser.fullName.split(' ')[0];
    let lastName = this.authenticatedUser.fullName.split(' ')[1];

    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }

  signOut(){
    localStorage.removeItem("user");
    this.authenticatedUser = null;
    this.isAuthenticated = false;
    this.getUserInitials();
    this.router.navigate(['home']);
  }

  voidClick(){}
}
