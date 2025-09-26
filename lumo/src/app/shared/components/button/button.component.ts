import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button
      *ngIf="!isLink"
      [type]="type"
      [class]="buttonClasses"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel"
      (click)="onClick.emit($event)"
    >
      <svg 
        *ngIf="icon && !iconRight" 
        class="btn-icon" 
        [class]="iconClass"
        [attr.width]="iconSize" 
        [attr.height]="iconSize" 
        [attr.viewBox]="iconViewBox"
        [innerHTML]="iconSvg"
      ></svg>
      <span *ngIf="text" [class]="textClass">{{ text }}</span>
      <svg 
        *ngIf="icon && iconRight" 
        class="btn-icon" 
        [class]="iconClass"
        [attr.width]="iconSize" 
        [attr.height]="iconSize" 
        [attr.viewBox]="iconViewBox"
        [innerHTML]="iconSvg"
      ></svg>
      <ng-content></ng-content>
    </button>

    <a
      *ngIf="isLink"
      [routerLink]="routerLink"
      [href]="href"
      [class]="buttonClasses"
      [attr.aria-label]="ariaLabel"
      [attr.target]="target"
      [attr.rel]="rel"
    >
      <svg 
        *ngIf="icon && !iconRight" 
        class="btn-icon" 
        [class]="iconClass"
        [attr.width]="iconSize" 
        [attr.height]="iconSize" 
        [attr.viewBox]="iconViewBox"
        [innerHTML]="iconSvg"
      ></svg>
      <span *ngIf="text" [class]="textClass">{{ text }}</span>
      <svg 
        *ngIf="icon && iconRight" 
        class="btn-icon" 
        [class]="iconClass"
        [attr.width]="iconSize" 
        [attr.height]="iconSize" 
        [attr.viewBox]="iconViewBox"
        [innerHTML]="iconSvg"
      ></svg>
      <ng-content></ng-content>
    </a>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() icon: string = '';
  @Input() iconRight: boolean = false;
  @Input() iconSize: string = '20';
  @Input() iconViewBox: string = '0 0 24 24';
  @Input() ariaLabel: string = '';
  @Input() routerLink: string = '';
  @Input() href: string = '';
  @Input() target: string = '';
  @Input() rel: string = '';

  @Output() onClick = new EventEmitter<Event>();

  get isLink(): boolean {
    return !!(this.routerLink || this.href);
  }

  get buttonClasses(): string {
    const classes = ['btn'];
    
    if (this.variant) classes.push(`btn-${this.variant}`);
    if (this.size) classes.push(`btn-${this.size}`);
    if (this.fullWidth) classes.push('btn-full-width');
    if (this.loading) classes.push('btn-loading');
    if (this.disabled) classes.push('btn-disabled');
    
    return classes.join(' ');
  }

  get iconClass(): string {
    return this.iconRight ? 'btn-icon-right' : 'btn-icon-left';
  }

  get textClass(): string {
    return this.loading ? 'btn-text-loading' : 'btn-text';
  }

  get iconSvg(): string {
    // Icon SVG content based on icon name
    const icons: { [key: string]: string } = {
      'login': '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10,17 15,12 10,7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>',
      'shopping-cart': '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>',
      'home': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline>',
      'user': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
      'shopping-bag': '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>',
      'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12,5 19,12 12,19"></polyline>',
      'plus': '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>',
      'search': '<circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path>',
      'heart': '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
      'star': '<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>',
      'menu': '<line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line>',
      'close': '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
      'chevron-down': '<polyline points="6,9 12,15 18,9"></polyline>',
      'chevron-up': '<polyline points="18,15 12,9 6,15"></polyline>',
      'chevron-left': '<polyline points="15,18 9,12 15,6"></polyline>',
      'chevron-right': '<polyline points="9,18 15,12 9,6"></polyline>',
      'check': '<polyline points="20,6 9,17 4,12"></polyline>',
      'x': '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
      'edit': '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>',
      'trash': '<polyline points="3,6 5,6 21,6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
      'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7,10 12,15 17,10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>',
      'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17,8 12,3 7,8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>',
      'settings': '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
      'info': '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
      'alert': '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>',
      'loading': '<line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>',
      'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>',
      'eye-off': '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>'
    };
    
    return icons[this.icon] || '';
  }
}
