import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ButtonComponent],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  showPassword = false;
  rememberMe = false;

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Initialize component
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onRememberMeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.rememberMe = target.checked;
    this.signinForm.patchValue({ rememberMe: this.rememberMe });
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      const formData = this.signinForm.value;
      console.log('Sign in data:', formData);
      
      // TODO: Implement actual sign-in logic
      // For now, just log the form data
      alert('Sign in functionality will be implemented with backend integration');
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      Object.keys(this.signinForm.controls).forEach(key => {
        this.signinForm.get(key)?.markAsTouched();
      });
    }
  }

  get usernameError(): string {
    const control = this.signinForm.get('username');
    if (control?.touched && control?.dirty && control?.errors) {
      if (control.errors['required']) return 'Username is required';
      if (control.errors['minlength']) return 'Username must be at least 3 characters';
    }
    return '';
  }

  get passwordError(): string {
    const control = this.signinForm.get('password');
    if (control?.touched && control?.dirty && control?.errors) {
      if (control.errors['required']) return 'Password is required';
      if (control.errors['minlength']) return 'Password must be at least 6 characters';
    }
    return '';
  }
}
