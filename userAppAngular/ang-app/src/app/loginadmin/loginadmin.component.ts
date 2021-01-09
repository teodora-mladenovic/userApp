import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css'],
  providers: [ UserService ]
})
export class LoginadminComponent implements OnInit {

  error = '';
  authorizedUser = JSON.parse(sessionStorage.getItem('authorizedUser')!);

  loginadminForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    userEmail: new FormControl()
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginadmin() {
    const data = this.loginadminForm.value;
    console.log(data);

    this.userService.loginadmin(data).subscribe((response) => {
      
      console.log('Logged in user: ', response.body);
      this.authorizedUser = response.body;
      sessionStorage.setItem('authorizedUser', JSON.stringify(this.authorizedUser));
      this.router.navigate(['/profile']);
      this.error = '';
      this.loginadminForm.reset();
      this.router.navigate(['/profile']);
    }, (error) => {
      console.error('Error ', error);
      this.error = error.error['error'];
    });
  }
}
