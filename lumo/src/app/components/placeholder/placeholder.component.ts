import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="placeholder-container">
      <div class="placeholder-content">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <button class="btn btn-primary" routerLink="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9,22 9,12 15,12 15,22"></polyline>
          </svg>
          Go Home
        </button>
      </div>
    </div>
  `,
  styles: [`
    .placeholder-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .placeholder-content {
      text-align: center;
      padding: 2rem;
    }
    
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
      }
      
      svg {
        width: 20px;
        height: 20px;
      }
    }
  `]
})
export class PlaceholderComponent {
  title = 'Coming Soon!';
  description = 'This feature is under development. Stay tuned for updates!';
}

