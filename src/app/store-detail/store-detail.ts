import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';

import { ObrasService } from '../services/obras.service';
import { Obra } from '../models/obra';

@Component({
  selector: 'app-store-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './store-detail.html',
  styleUrls: ['./store-detail.css'],
})
export class StoreDetailComponent {
  private route = inject(ActivatedRoute);
  private obrasService = inject(ObrasService);

  obra = signal<Obra | null>(null);
  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');

      if (!id) {
        this.errorMsg.set('No se recibió un ID en la ruta.');
        this.isLoading.set(false);
        return;
      }

      this.isLoading.set(true);
      this.errorMsg.set(null);

      this.obrasService
        .getObraById(id)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: (data) => this.obra.set(data),
          error: (err) => {
            console.error('Error al cargar obra por ID:', err);
            this.errorMsg.set('Error al cargar la obra.');
          },
        });
    });
  }
}