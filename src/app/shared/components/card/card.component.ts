import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses" [attr.role]="role">
      <div *ngIf="header || showHeader" class="card-header">
        <ng-content select="[slot=header]"></ng-content>
        <h3 *ngIf="title" class="card-title">{{ title }}</h3>
        <p *ngIf="subtitle" class="card-subtitle">{{ subtitle }}</p>
      </div>
      
      <div class="card-content">
        <ng-content select="[slot=content]"></ng-content>
        <ng-content></ng-content>
      </div>
      
      <div *ngIf="hasFooter" class="card-footer">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() variant: CardVariant = 'default';
  @Input() size: CardSize = 'md';
  @Input() hoverable: boolean = false;
  @Input() clickable: boolean = false;
  @Input() loading: boolean = false;
  @Input() role: string = 'article';
  @Input() header: boolean = false;
  @Input() footer: boolean = false;

  get showHeader(): boolean {
    return this.header || !!(this.title || this.subtitle);
  }

  get hasFooter(): boolean {
    return this.footer;
  }

  get cardClasses(): string {
    const classes = ['card'];
    
    if (this.variant) classes.push(`card-${this.variant}`);
    if (this.size) classes.push(`card-${this.size}`);
    if (this.hoverable) classes.push('card-hoverable');
    if (this.clickable) classes.push('card-clickable');
    if (this.loading) classes.push('card-loading');
    
    return classes.join(' ');
  }
}
