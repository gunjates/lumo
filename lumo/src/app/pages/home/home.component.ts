import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredProducts = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      image: 'https://via.placeholder.com/300x200',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 199.99,
      image: 'https://via.placeholder.com/300x200',
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: 'Ultra HD Camera',
      price: 599.99,
      image: 'https://via.placeholder.com/300x200',
      rating: 4.9,
      reviews: 156
    }
  ];

  categories = [
    { name: 'Electronics', icon: '📱', count: 150 },
    { name: 'Fashion', icon: '👕', count: 200 },
    { name: 'Home & Garden', icon: '🏠', count: 75 },
    { name: 'Sports', icon: '⚽', count: 100 }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}


