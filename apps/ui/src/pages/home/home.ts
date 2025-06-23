import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, Signal, signal, untracked, ViewEncapsulation } from '@angular/core';
import { ProductModel } from '@shared/models/product.model';
import { TrCurrencyPipe } from 'tr-currency';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ActivatedRoute } from '@angular/router';
import { Common } from '../../services/common';

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
  readonly placeholderCount = signal<number[]>([1,2,3]);
  readonly categoryUrl = signal<string | undefined>(undefined);
  readonly categoryUrlPrev = this.computedPrevious(this.categoryUrl);
  readonly limit = signal<number>(6);
  readonly start = signal<number>(0);
  readonly result = httpResource<ProductModel[]>(() => {
    let endpoint = 'api/products?';
    if (this.categoryUrl()) {
      endpoint += `categoryUrl=${this.categoryUrl()}&`;
    }
    endpoint += `_limit=${this.limit()}&_start=${this.start()}`;

    return endpoint;
  });
  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());
  readonly dataSignal = signal<ProductModel[]>([]);

  readonly user = computed(() => this.#common.user());

  readonly #activated = inject(ActivatedRoute);
  readonly #common = inject(Common);

  constructor() {
    this.#activated.params.subscribe(res => {
      if (res['categoryUrl']) {
        this.categoryUrl.set(res['categoryUrl']);
      }
    });

    effect(() => {
      if (this.categoryUrlPrev() !== this.categoryUrl()) {
        this.dataSignal.set([...this.data()]);
        this.limit.set(6);
        this.start.set(0);
      } else {
        this.dataSignal.update(prev => [...prev, ...this.data()]);
      }
    })
  }

  onScroll() {
    if(this.start() >= 0) return; //gelen ürün saysının counutu alıp vermemiz gerekiyordu ama json-server da öyle bir endpoint olmadığı için şimdilik manuel yazdık
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
