import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'textarea';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outlined';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="input-container" [class]="containerClasses">
      <label *ngIf="label" [for]="inputId" class="input-label">
        {{ label }}
        <span *ngIf="required" class="input-required">*</span>
      </label>
      
      <div class="input-wrapper" [class]="wrapperClasses">
        <div *ngIf="icon && !iconRight" class="input-icon-left">
          <svg 
            class="input-icon" 
            [attr.width]="iconSize" 
            [attr.height]="iconSize" 
            [attr.viewBox]="iconViewBox"
            [innerHTML]="iconSvg"
          ></svg>
        </div>
        
        <input
          *ngIf="type !== 'textarea'"
          [id]="inputId"
          [type]="type"
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [required]="required"
          [min]="min"
          [max]="max"
          [attr.minlength]="minLength"
          [attr.maxlength]="maxLength"
          [pattern]="pattern"
          [autocomplete]="autocomplete"
          [class]="inputClasses"
          (input)="handleInput($event)"
          (blur)="handleBlur($event)"
          (focus)="handleFocus($event)"
          (keyup)="handleKeyup($event)"
          (keydown)="handleKeydown($event)"
        />
        
        <textarea
          *ngIf="type === 'textarea'"
          [id]="inputId"
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [required]="required"
          [attr.minlength]="minLength"
          [attr.maxlength]="maxLength"
          [rows]="rows"
          [cols]="cols"
          [class]="inputClasses"
          (input)="handleInput($event)"
          (blur)="handleBlur($event)"
          (focus)="handleFocus($event)"
          (keyup)="handleKeyup($event)"
          (keydown)="handleKeydown($event)"
        ></textarea>
        
        <div *ngIf="icon && iconRight" class="input-icon-right" (click)="handleIconClick($event)">
          <svg 
            class="input-icon" 
            [attr.width]="iconSize" 
            [attr.height]="iconSize" 
            [attr.viewBox]="iconViewBox"
            [innerHTML]="iconSvg"
          ></svg>
        </div>
        
        <button 
          *ngIf="clearable && value" 
          type="button" 
          class="input-clear"
          (click)="clearValue()"
          [attr.aria-label]="'Clear ' + (label || 'input')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div *ngIf="hint || error" class="input-message" [class]="error ? 'input-error' : 'input-hint'">
        {{ error || hint }}
      </div>
    </div>
  `,
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: InputType = 'text';
  @Input() size: InputSize = 'md';
  @Input() variant: InputVariant = 'default';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() hint: string = '';
  @Input() error: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() clearable: boolean = false;
  @Input() icon: string = '';
  @Input() iconRight: boolean = false;
  @Input() iconSize: string = '20';
  @Input() iconViewBox: string = '0 0 24 24';
  @Input() min: number | string = '';
  @Input() max: number | string = '';
  @Input() minLength: number = 0;
  @Input() maxLength: number = 0;
  @Input() pattern: string = '';
  @Input() autocomplete: string = '';
  @Input() rows: number = 3;
  @Input() cols: number = 0;

  @Output() onInput = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onKeyup = new EventEmitter<KeyboardEvent>();
  @Output() onKeydown = new EventEmitter<KeyboardEvent>();
  @Output() iconClick = new EventEmitter<Event>();

  value: string = '';
  inputId: string = `input-${Math.random().toString(36).substr(2, 9)}`;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  get containerClasses(): string {
    const classes = ['input-container'];
    
    if (this.size) classes.push(`input-${this.size}`);
    if (this.variant) classes.push(`input-${this.variant}`);
    if (this.disabled) classes.push('input-disabled');
    if (this.error) classes.push('input-error-state');
    
    return classes.join(' ');
  }

  get wrapperClasses(): string {
    const classes = ['input-wrapper'];
    
    if (this.icon && !this.iconRight) classes.push('input-with-icon-left');
    if (this.icon && this.iconRight) classes.push('input-with-icon-right');
    if (this.clearable) classes.push('input-clearable');
    if (this.error) classes.push('input-error');
    if (this.disabled) classes.push('input-disabled');
    
    return classes.join(' ');
  }

  get inputClasses(): string {
    const classes = ['input'];
    
    if (this.type === 'textarea') classes.push('input-textarea');
    
    return classes.join(' ');
  }

  get iconSvg(): string {
    const icons: { [key: string]: string } = {
      'search': '<circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path>',
      'user': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
      'email': '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',
      'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
      'lock': '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
      'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>',
      'eye-off': '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
      'calendar': '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
      'map-pin': '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',
      'credit-card': '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>',
      'dollar-sign': '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>'
    };
    
    return icons[this.icon] || '';
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onInput.emit(event);
  }

  handleBlur(event: Event): void {
    this.onTouched();
    this.onBlur.emit(event);
  }

  handleFocus(event: Event): void {
    this.onFocus.emit(event);
  }

  handleKeyup(event: KeyboardEvent): void {
    this.onKeyup.emit(event);
  }

  handleKeydown(event: KeyboardEvent): void {
    this.onKeydown.emit(event);
  }

  handleIconClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.iconClick.emit(event);
  }

  clearValue(): void {
    this.value = '';
    this.onChange(this.value);
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
