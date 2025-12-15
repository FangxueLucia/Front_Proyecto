import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  //para definir que este componente va a tener imagenes necesita un array al que le voy a llamar 'images'.
  @Input() images: string[] = []; //datos que recibe del componente padre (home.component.ts)
  @Input() interval: number = 3000; //intervalo de 3 segundos entre cada imagen
  currentImageIndex: number = 0;
  private slideInterval: any; //variable que guarda la referencia del intervalo
  constructor() {}
  ngOnInit(): void {
    if (this.images.length > 1) {
      this.startAutoSlide();
    }
  }

  // ------------- CONTROLADOR DE SLIDE -------------
  nextSlide() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.restartSlideInterval(); //para poder reiniciar el temporizador al interactuar manualmente
  }
  prevSlide() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.restartSlideInterval(); //para poder reiniciar el temporizador al interactuar manualmente
  }

  // ------------- AUTO SLIDE -------------
  startAutoSlide(): void {
    this.slideInterval = setInterval(() => this.nextSlide(), this.interval);
  }
  restartSlideInterval(): void {
    clearInterval(this.slideInterval);
    this.startAutoSlide();
  }

  // -------------- LIMPIEZA -------------
  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }
}
