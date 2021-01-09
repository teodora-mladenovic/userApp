import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { 
    this.email = '';
    this.loginCount = '';
    this.id = '';
    this.isAdmin = false;
  }

  email : string;
  loginCount: string;
  id: string;
  isAdmin: boolean;
  
 

  ngOnInit(): void {
   
      this.email = JSON.parse(sessionStorage.getItem('authorizedUser')!).user.email || "";
      this.loginCount = JSON.parse(sessionStorage.getItem('authorizedUser')!).user.loginCount || "";
      this.id = JSON.parse(sessionStorage.getItem('authorizedUser')!).user._id || "";
      this.isAdmin = JSON.parse(sessionStorage.getItem('authorizedUser')!).user.isAdmin || "";
     
    
  }




  logout() {
    sessionStorage.removeItem('authorizedUser');
   
  }
  

}
