import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { Common } from '../../services/common';
import { BasketModel } from '@shared/models/basket.model';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  imports: [
    TrCurrencyPipe
  ],
  templateUrl: './baskets.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Baskets {
  readonly result = httpResource<BasketModel[]>(() => {
    const endpoint = `api/baskets?userId=${this.#common.user()!.id}`;
    return endpoint;
  });
  readonly data = computed(() => this.result.value() ?? []);
  readonly total = computed(() => {
    let val = 0;
    this.data().forEach(res => {
      val+= res.productPrice * res.quantity
    });

    return val;
  });
  readonly kdv = computed(() => this.total() * 18 / 100);

  readonly #common = inject(Common);
}
