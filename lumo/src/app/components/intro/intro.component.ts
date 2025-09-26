import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentService, IntroContent } from '../../core/services/content.service';
import { ButtonComponent } from '../../shared/components';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  introContent$: Observable<IntroContent>;

  constructor(private contentService: ContentService) {
    this.introContent$ = this.contentService.getIntroContent();
  }

  ngOnInit(): void {
    // Content is loaded via the observable
    this.introContent$.subscribe(content => {
      console.log('Intro content loaded:', content);
      console.log('Background image URL:', content.backgroundImage.url);
      console.log('Full background style:', `url(${content.backgroundImage.url})`);
      
      // Test if the image URL is accessible
      const img = new Image();
      img.onload = () => console.log('Background image loaded successfully');
      img.onerror = () => console.error('Background image failed to load:', content.backgroundImage.url);
      img.src = content.backgroundImage.url;
    });
  }
}

