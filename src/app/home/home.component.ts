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
    'https://content3.cdnprado.net/imagenes/proyectos/personalizacion/7317a29a-d846-4c54-9034-6a114c3658fe/cms/meninas-antes.jpg',
    'https://www.floppycats.com/wp-content/uploads/2023/08/tricolor-kitten-is-playing-on-a-white-background-in-front-of-the-camera-1.jpg',
    'https://img.freepik.com/premium-photo/kitten-white-background_78621-487.jpg',
  ];

  ngOnInit(): void {}
}
