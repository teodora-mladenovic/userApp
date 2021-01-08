import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UserService ]
})
export class RegisterComponent implements OnInit {

  error = '';

  registerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    password2: new FormControl()
  });


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister() {
    const data = this.registerForm.value;
    console.log(data);
    
    this.userService.register(data).subscribe((result) => {
      console.log('Success!!!!', result);
      this.error = 'Uspesno ste se registrovali, predjite na prijavljivanje!';
      this.registerForm.reset();
    }, (error) => {
      console.error('Error ', error);
      this.error = error.error['error'];
    });
  }

}
