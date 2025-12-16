import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

import { ObrasService } from '../services/obras.service';
import { Obra } from '../models/obra';

@Component({
  selector: 'app-store-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-detail.html',
  styleUrl: './store-detail.css',
})
export class StoreDetailComponent implements OnInit {
  obra: Obra | null = null;
  loading = true;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private obrasService: ObrasService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.errorMsg = '';

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading = false;
      this.errorMsg = 'No se recibió el id de la obra.';
      return;
    }

    this.obrasService
      .getObraById(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res: any) => {
          // Soporta ambos formatos:
          // 1) API devuelve la obra directo -> res
          // 2) API devuelve { data: obra } -> res.data
          this.obra = (res?.data ?? res) as Obra;
        },
        error: () => {
          this.errorMsg = 'No se pudo cargar el detalle de la obra.';
          this.obra = null;
        },
      });
  }
}