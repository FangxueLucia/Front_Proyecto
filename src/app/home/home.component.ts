import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  imageUrls: string[] = [
    'https://www.humaneworld.org/sites/default/files/styles/sa_social_media_facebook/public/2022-07/kitten-playing-575035.jpg?h=b1b36da8&itok=0HJldiWn',
    'https://www.floppycats.com/wp-content/uploads/2023/08/tricolor-kitten-is-playing-on-a-white-background-in-front-of-the-camera-1.jpg',
    'https://img.freepik.com/premium-photo/kitten-white-background_78621-487.jpg',
  ];

  ngOnInit(): void {}
}
