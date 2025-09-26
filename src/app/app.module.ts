import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { ImageTestComponent } from './components/image-test/image-test.component';
import { ComponentsDemoComponent } from './components/components-demo/components-demo.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';

// Export routes for standalone bootstrap
export const routes: Routes = [
  {
    path: '',
    component: IntroComponent
  },
  {
    path: 'test',
    component: ImageTestComponent
  },
  {
    path: 'components',
    component: ComponentsDemoComponent
  },
  {
    path: 'products',
    component: PlaceholderComponent
  },
  {
    path: 'cart',
    component: PlaceholderComponent
  },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            component: SigninComponent
          },
          {
            path: 'signin',
            component: SigninComponent
          },
          {
            path: 'signup',
            component: SignupComponent
          },
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
          }
        ]
      },
  {
    path: 'profile',
    component: PlaceholderComponent
  },
  {
    path: 'admin',
    component: PlaceholderComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }