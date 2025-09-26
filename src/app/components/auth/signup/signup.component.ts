import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  
  // Country codes for phone number
  countryCodes = [
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+86', country: 'CN', flag: '🇨🇳' },
    { code: '+81', country: 'JP', flag: '🇯🇵' },
    { code: '+61', country: 'AU', flag: '🇦🇺' },
    { code: '+55', country: 'BR', flag: '🇧🇷' },
    { code: '+7', country: 'RU', flag: '🇷🇺' }
  ];
  
  selectedCountryCode = '+91';

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      phone: ['', [this.phoneValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      countryCode: ['+91']
    }, { validators: [this.emailOrPhoneRequiredValidator, this.passwordMatchValidator] });
  }

  ngOnInit(): void {
    // Initialize component
  }

  // Custom validator for phone number
  phoneValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(control.value)) {
      return { invalidPhone: true };
    }
    return null;
  }

  // Custom validator to ensure either email or phone is provided
  emailOrPhoneRequiredValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.get('email')?.value;
    const phone = control.get('phone')?.value;
    
    if (!email && !phone) {
      return { emailOrPhoneRequired: true };
    }
    return null;
  }

  // Custom validator for password match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onCountryCodeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCountryCode = target.value;
    this.signupForm.patchValue({ countryCode: target.value });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log('Sign up data:', formData);
      
      // TODO: Implement actual sign-up logic
      alert('Sign up functionality will be implemented with backend integration');
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

  // Error getters for each field
  get firstNameError(): string {
    const control = this.signupForm.get('firstName');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'First name is required';
      if (control.errors['minlength']) return 'First name must be at least 2 characters';
    }
    return '';
  }

  get lastNameError(): string {
    const control = this.signupForm.get('lastName');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Last name is required';
      if (control.errors['minlength']) return 'Last name must be at least 2 characters';
    }
    return '';
  }

  get emailError(): string {
    const control = this.signupForm.get('email');
    if (control?.touched && control?.errors) {
      if (control.errors['email']) return 'Please enter a valid email address';
    }
    return '';
  }

  get phoneError(): string {
    const control = this.signupForm.get('phone');
    if (control?.touched && control?.errors) {
      if (control.errors['invalidPhone']) return 'Please enter a valid 10-digit phone number';
    }
    return '';
  }

  get passwordError(): string {
    const control = this.signupForm.get('password');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Password is required';
      if (control.errors['minlength']) return 'Password must be at least 6 characters';
    }
    return '';
  }

  get confirmPasswordError(): string {
    const control = this.signupForm.get('confirmPassword');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Please confirm your password';
    }
    return '';
  }

  get formError(): string {
    if (this.signupForm.errors) {
      if (this.signupForm.errors['emailOrPhoneRequired']) {
        return 'Either email or phone number is required';
      }
      if (this.signupForm.errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }
    return '';
  }
}
