import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService) {
    
   }

  error = '';
  users: any = [];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response) => {
      
    this.users = response;
    
      
      
    }, (error) => {
      console.error('Error ', error);
      this.error = error.error['error'];
    });
  }

}
