import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { ServiceRentService } from '../service/service-rent.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  email!: string;
  password!: string;
  form!: FormGroup;

  public errors: string[]= [];

  constructor(
    private _router: Router,
    private authService: AuthService,
    private fb: FormBuilder
    ) {
      this.form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
     }


  login(): void {
    this.errors=[]
    if (this.form.invalid) {
      // Verifica se il campo data è vuoto
      if (this.form.controls['email'].errors?.['required']) {
        this.errors.push('Missing or incorrect email');
      }
      // Verifica se il campo store è vuoto
      if (this.form.controls['password'].errors?.['required']) {
        this.errors.push('Missing or incorrect password');
      }
    } else {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        const token = response.data.login;
        // Salva il token
        localStorage.setItem('token', token);
        // Reindirizza alla pagina del dashboard dopo il login
        this._router.navigateByUrl('/dashboard')
      },
      error => {
        console.error(error);
        this.errors.push('Login failed');
      }
    );
    }
  }

}
