import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselItem {
  src: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit, OnDestroy, OnChanges {
  //para definir que este componente va a tener imagenes necesita un array al que le voy a llamar 'images'.
  @Input() images: CarouselItem[] = []; //datos que recibe del componente padre (home.component.ts)
  @Input() interval: number = 3000; //intervalo de 3 segundos entre cada imagen
  currentImageIndex: number = 0;
  private slideInterval: any; //variable que guarda la referencia del intervalo
  constructor() {}
  ngOnInit(): void {
    if (this.images.length > 1) {
      this.startAutoSlide();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && this.images.length > 1) {
      this.restartSlideInterval();
    }
  }

  goToSlide(index: number): void {
    //para la navegación por indicadores
    this.currentImageIndex = index;
    this.restartSlideInterval();
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
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    this.slideInterval = setInterval(() => this.nextSlide(), this.interval);
  }
  restartSlideInterval(): void {
    this.startAutoSlide();
  }

  // -------------- LIMPIEZA -------------
  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }
}
