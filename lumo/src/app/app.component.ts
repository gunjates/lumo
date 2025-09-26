import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContentService, NavigationContent } from './core/services/content.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Lumo E-commerce';
  navigationContent$: Observable<NavigationContent>;
  private destroy$ = new Subject<void>();

  constructor(private contentService: ContentService) {
    this.navigationContent$ = this.contentService.getNavigationContent();
  }

  ngOnInit(): void {
    // Initialize app-level services here
    this.initializeApp();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeApp(): void {
    // App initialization logic
    console.log(`${this.title} initialized successfully`);
  }
}