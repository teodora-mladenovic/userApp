import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {

  error = '';
  authorizedUser = JSON.parse(sessionStorage.getItem('authorizedUser')!);
  

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private userService: UserService, private router: Router) { 
    
  }

  ngOnInit(): void {
  }
  


  onLogin() {
    const data = this.loginForm.value;
    console.log(data);

    this.userService.login(data).subscribe((response) => {
      
      console.log('Logged in user: ', response.body);
      this.authorizedUser = response.body;
      sessionStorage.setItem('authorizedUser', JSON.stringify(this.authorizedUser));
      this.router.navigate(['/profile']);
      this.error = '';
      this.loginForm.reset();
      this.router.navigate(['/profile']);
    }, (error) => {
      console.error('Error ', error);
      this.error = error.error['error'];
    });
  }

}
