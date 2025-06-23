import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Common } from '../../services/common';
import { BasketModel } from '@shared/models/basket.model';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  imports: [
    RouterLink,
    TrCurrencyPipe
  ],
  templateUrl: './payment.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Payment {
  readonly result = httpResource<BasketModel[]>(() => `api/baskets?userId=${this.#common.user()!.id}`);
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
