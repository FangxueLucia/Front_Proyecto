import { Injectable, computed, effect, signal } from '@angular/core';
import { Obra } from '../models/obra';

export interface CartItem {
  obra: Obra;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'cart_items_v1';

  // Estado principal
  items = signal<CartItem[]>(this.load());

  // Derivados
  count = computed(() => this.items().reduce((acc, it) => acc + it.qty, 0));
  total = computed(() =>
    this.items().reduce((acc, it) => acc + (it.obra.precio ?? 0) * it.qty, 0)
  );

  constructor() {
    // Persistir automáticamente cada cambio
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
    });
  }

  add(obra: Obra, qty = 1) {
    const current = this.items();
    const idx = current.findIndex((x) => x.obra._id === obra._id);

    if (idx >= 0) {
      const copy = [...current];
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
      this.items.set(copy);
      return;
    }

    this.items.set([...current, { obra, qty }]);
  }

  remove(obraId: string) {
    this.items.set(this.items().filter((x) => x.obra._id !== obraId));
  }

  setQty(obraId: string, qty: number) {
    const safeQty = Math.max(1, Math.floor(Number(qty) || 1));
    this.items.set(
      this.items().map((x) =>
        x.obra._id === obraId ? { ...x, qty: safeQty } : x
      )
    );
  }

  // ✅ Subir cantidad en 1 (para botones +)
  inc(obraId: string) {
    const item = this.items().find((x) => x.obra._id === obraId);
    if (!item) return;
    this.setQty(obraId, item.qty + 1);
  }

  // ✅ Bajar cantidad en 1 (para botones -)
  // Si llega a 0, lo quitamos del carrito
  dec(obraId: string) {
    const item = this.items().find((x) => x.obra._id === obraId);
    if (!item) return;

    const nextQty = item.qty - 1;
    if (nextQty <= 0) {
      this.remove(obraId);
      return;
    }

    this.setQty(obraId, nextQty);
  }

  clear() {
    this.items.set([]);
  }

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      return JSON.parse(raw) as CartItem[];
    } catch {
      return [];
    }
  }
}
