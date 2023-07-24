import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  form: FormGroup;
  public errors: string[]= [];

  constructor(private fb: FormBuilder,
    private _router: Router,
    private authService: AuthService) {
    this.form = this.fb.group({
      customer_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() : void {
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

      const user = this.form.value;
      this.authService.register(user).subscribe(
        response => {
          console.log('Registration successful:', response);
          this._router.navigate(['/']);
        },
        error => {
          console.error('Registration failed:', error);
          this.errors.push('Registration failed. Please try again.');
        }
      );
    }
  }
}
