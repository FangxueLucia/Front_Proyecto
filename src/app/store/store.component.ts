import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, timeout } from 'rxjs/operators';

import { ObrasService } from '../services/obras.service';
import { Obra } from '../models/obra';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent implements OnInit, OnDestroy {
  obras: Obra[] = [];
  loading = false;
  errorMsg = '';

  private sub?: Subscription;

  constructor(private obrasService: ObrasService) {}

  ngOnInit(): void {
    this.cargarObras();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  cargarObras(): void {
    console.log('[Store] cargarObras() -> START');
    this.loading = true;
    this.errorMsg = '';

    // cancelamos la anterior si quedó viva
    this.sub?.unsubscribe();

    this.sub = this.obrasService
      .getObras()
      .pipe(
        // ⛑️ evita "cargando eterno": si en 10s no responde, falla
        timeout(10000),

        // ⛑️ pase lo que pase, suelta el loader
        finalize(() => {
          this.loading = false;
          console.log('[Store] cargarObras() -> FINALIZE (loading=false)');
        })
      )
      .subscribe({
        next: (data) => {
          console.log('[Store] cargarObras() -> NEXT', data);
          this.obras = data?.results ?? [];
        },
        error: (err) => {
          console.error('[Store] cargarObras() -> ERROR', err);
          this.errorMsg =
            err?.name === 'TimeoutError'
              ? 'Timeout: el servidor tardó demasiado en responder.'
              : 'No se pudieron cargar las obras.';
        },
      });
  }
}