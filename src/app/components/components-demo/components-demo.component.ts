import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent, InputComponent } from '../../shared/components';

@Component({
  selector: 'app-components-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, CardComponent, InputComponent],
  template: `
    <div class="demo-container">
      <h1>Reusable Components Demo</h1>
      
      <!-- Button Demo -->
      <app-card title="Button Component" subtitle="Various button styles and sizes">
        <div slot="content" class="demo-section">
          <h3>Button Variants</h3>
          <div class="demo-buttons">
            <app-button text="Primary" variant="primary"></app-button>
            <app-button text="Secondary" variant="secondary"></app-button>
            <app-button text="Outline" variant="outline"></app-button>
            <app-button text="Ghost" variant="ghost"></app-button>
            <app-button text="Danger" variant="danger"></app-button>
            <app-button text="Success" variant="success"></app-button>
          </div>
          
          <h3>Button Sizes</h3>
          <div class="demo-buttons">
            <app-button text="Small" variant="primary" size="sm"></app-button>
            <app-button text="Medium" variant="primary" size="md"></app-button>
            <app-button text="Large" variant="primary" size="lg"></app-button>
            <app-button text="Extra Large" variant="primary" size="xl"></app-button>
          </div>
          
          <h3>Buttons with Icons</h3>
          <div class="demo-buttons">
            <app-button text="Login" variant="primary" icon="login"></app-button>
            <app-button text="Shopping Cart" variant="outline" icon="shopping-cart"></app-button>
            <app-button text="Search" variant="ghost" icon="search"></app-button>
            <app-button text="Download" variant="success" icon="download"></app-button>
          </div>
          
          <h3>Button States</h3>
          <div class="demo-buttons">
            <app-button text="Normal" variant="primary"></app-button>
            <app-button text="Loading" variant="primary" [loading]="true"></app-button>
            <app-button text="Disabled" variant="primary" [disabled]="true"></app-button>
          </div>
        </div>
      </app-card>

      <!-- Card Demo -->
      <app-card title="Card Component" subtitle="Different card styles and layouts">
        <div slot="content" class="demo-section">
          <h3>Card Variants</h3>
          <div class="demo-cards">
            <app-card title="Default Card" variant="default" size="sm">
              <div slot="content">This is a default card with basic styling.</div>
            </app-card>
            
            <app-card title="Elevated Card" variant="elevated" size="sm">
              <div slot="content">This card has elevated shadow for depth.</div>
            </app-card>
            
            <app-card title="Outlined Card" variant="outlined" size="sm">
              <div slot="content">This card has a border outline.</div>
            </app-card>
            
            <app-card title="Filled Card" variant="filled" size="sm">
              <div slot="content">This card has a filled background.</div>
            </app-card>
          </div>
          
          <h3>Interactive Cards</h3>
          <div class="demo-cards">
            <app-card title="Hoverable Card" variant="elevated" [hoverable]="true" size="sm">
              <div slot="content">Hover over this card to see the effect.</div>
            </app-card>
            
            <app-card title="Clickable Card" variant="outlined" [clickable]="true" size="sm">
              <div slot="content">This card can be clicked.</div>
            </app-card>
          </div>
        </div>
      </app-card>

      <!-- Input Demo -->
      <app-card title="Input Component" subtitle="Form input variations and states">
        <div slot="content" class="demo-section">
          <h3>Input Types</h3>
          <div class="demo-inputs">
            <app-input label="Text Input" placeholder="Enter text" type="text"></app-input>
            <app-input label="Email Input" placeholder="Enter email" type="email"></app-input>
            <app-input label="Password Input" placeholder="Enter password" type="password"></app-input>
            <app-input label="Number Input" placeholder="Enter number" type="number"></app-input>
          </div>
          
          <h3>Input Variants</h3>
          <div class="demo-inputs">
            <app-input label="Default Input" placeholder="Default style" variant="default"></app-input>
            <app-input label="Filled Input" placeholder="Filled style" variant="filled"></app-input>
            <app-input label="Outlined Input" placeholder="Outlined style" variant="outlined"></app-input>
          </div>
          
          <h3>Input Sizes</h3>
          <div class="demo-inputs">
            <app-input label="Small Input" placeholder="Small size" size="sm"></app-input>
            <app-input label="Medium Input" placeholder="Medium size" size="md"></app-input>
            <app-input label="Large Input" placeholder="Large size" size="lg"></app-input>
          </div>
          
          <h3>Input with Icons</h3>
          <div class="demo-inputs">
            <app-input label="Search Input" placeholder="Search..." icon="search"></app-input>
            <app-input label="Email Input" placeholder="Email address" icon="email" type="email"></app-input>
            <app-input label="Password Input" placeholder="Password" icon="lock" type="password"></app-input>
          </div>
          
          <h3>Input States</h3>
          <div class="demo-inputs">
            <app-input label="Normal Input" placeholder="Normal state"></app-input>
            <app-input label="Error Input" placeholder="Error state" error="This field is required"></app-input>
            <app-input label="Disabled Input" placeholder="Disabled state" [disabled]="true"></app-input>
            <app-input label="Readonly Input" placeholder="Readonly state" [readonly]="true" value="Readonly value"></app-input>
          </div>
          
          <h3>Textarea</h3>
          <div class="demo-inputs">
            <app-input 
              label="Message" 
              placeholder="Enter your message" 
              type="textarea" 
              [rows]="4"
            ></app-input>
          </div>
        </div>
      </app-card>

      <!-- Combined Demo -->
      <app-card title="Combined Usage" subtitle="Components working together">
        <div slot="content" class="demo-section">
          <div class="demo-form">
            <h3>Contact Form</h3>
            <app-input label="Name" placeholder="Your name" icon="user"></app-input>
            <app-input label="Email" placeholder="your@email.com" type="email" icon="email"></app-input>
            <app-input 
              label="Message" 
              placeholder="Your message" 
              type="textarea" 
              [rows]="4"
            ></app-input>
            <div class="form-actions">
              <app-button text="Send Message" variant="primary" icon="arrow-right"></app-button>
              <app-button text="Cancel" variant="outline"></app-button>
            </div>
          </div>
        </div>
      </app-card>
    </div>
  `,
  styleUrls: ['./components-demo.component.scss']
})
export class ComponentsDemoComponent {}
