import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, Signal, signal, untracked, ViewEncapsulation } from '@angular/core';
import { ProductModel } from '@shared/models/product.model';
import { TrCurrencyPipe } from 'tr-currency';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [
    TrCurrencyPipe,
    InfiniteScrollDirective
  ],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Home {
  readonly categoryKey = signal<string | undefined>(undefined);
  readonly categoryKeyPrev = this.computedPrevious(this.categoryKey);
  readonly limit = signal<number>(6);
  readonly start = signal<number>(0);
  readonly result = httpResource<ProductModel[]>(() => {
    let endpoint = 'api/products?';
    if (this.categoryKey()) {
      endpoint += `categoryId=${this.categoryKey()}&`;
    }
    endpoint += `_limit=${this.limit()}&_start=${this.start()}`;

    return endpoint;
  });
  readonly data = computed(() => this.result.value() ?? []);
  readonly dataSignal = signal<ProductModel[]>([]);

  readonly #activated = inject(ActivatedRoute);

  constructor() {
    this.#activated.params.subscribe(res => {
      if (res['categoryKey']) {
        this.categoryKey.set(res['categoryKey']);
      }
    });

    effect(() => {
      if (this.categoryKeyPrev() !== this.categoryKey()) {
        this.dataSignal.set([...this.data()]);
        this.limit.set(6);
        this.start.set(0);
      } else {
        this.dataSignal.update(prev => [...prev, ...this.data()]);
      }
    })
  }

  onScroll() {
    this.limit.update(prev => prev + 6);
    this.start.update(prev => prev + 6);
  }

  computedPrevious<T>(s: Signal<T>): Signal<T> {
    let current = null as T;
    let previous = untracked(() => s());

    return computed(() => {
      current = s();
      const result = previous;
      previous = current;
      return result;
    });
  }
}
