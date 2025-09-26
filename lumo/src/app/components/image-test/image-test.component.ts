import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; background: white; color: black;">
      <h2>Image Loading Test</h2>
      <p>Testing if images load correctly:</p>
      
      <h3>Logo Test:</h3>
      <img src="/assets/logo.png" alt="Logo" style="width: 100px; height: 100px; border: 2px solid red;">
      <p>Logo should be visible above</p>
      
      <h3>Background Image Test (CSS):</h3>
      <div style="width: 300px; height: 200px; background-image: url('/assets/shopping-intro.png'); background-size: cover; background-position: center; border: 2px solid blue;"></div>
      <p>Background image should be visible above</p>
      
      <h3>Background Image Test (Angular):</h3>
      <div [style.background-image]="'url(/assets/shopping-intro.png)'" 
           style="width: 300px; height: 200px; background-size: cover; background-position: center; border: 2px solid green;"></div>
      <p>Background image with Angular binding should be visible above</p>
      
      <h3>Direct Image Test:</h3>
      <img src="/assets/shopping-intro.png" alt="Shopping Intro" style="width: 300px; height: 200px; object-fit: cover; border: 2px solid orange;">
      <p>Direct image should be visible above</p>
      
      <h3>All Available Images:</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
        <div *ngFor="let image of images" style="text-align: center;">
          <img [src]="image.url" [alt]="image.alt" style="width: 150px; height: 100px; object-fit: cover; border: 1px solid #ccc;">
          <p>{{ image.name }}</p>
        </div>
      </div>
    </div>
  `
})
export class ImageTestComponent {
  images = [
    { name: 'Logo', url: '/assets/logo.png', alt: 'Logo' },
    { name: 'Logo Full', url: '/assets/logo full.png', alt: 'Logo Full' },
    { name: 'Shopping Intro', url: '/assets/shopping-intro.png', alt: 'Shopping Intro' },
    { name: 'Shopping Venture 1', url: '/assets/shopping-venture-1080967.jpg', alt: 'Shopping Venture 1' },
    { name: 'Shopping Venture 2', url: '/assets/shopping-venture-4516039.jpg', alt: 'Shopping Venture 2' },
    { name: 'Shopping 1', url: '/assets/shopping-1761237.jpg', alt: 'Shopping 1' },
    { name: 'Online Shopping', url: '/assets/online-shopping-1082733.jpg', alt: 'Online Shopping' },
    { name: 'Pretty Girl', url: '/assets/pretty-girl-sitting-shopping-cart-removebg-preview.png', alt: 'Pretty Girl' },
    { name: 'Two Girls', url: '/assets/two-cheerful-girls-sweaters-having-fun-together-with-shopping-trolley-removebg-preview.png', alt: 'Two Girls' }
  ];
}

