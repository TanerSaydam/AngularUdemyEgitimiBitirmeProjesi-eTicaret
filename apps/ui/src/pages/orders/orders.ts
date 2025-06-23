import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { Common } from '../../services/common';
import { httpResource } from '@angular/common/http';
import { OrderModel } from '@shared/models/order.model';
import { DatePipe } from '@angular/common';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  imports: [
    DatePipe,
    TrCurrencyPipe
  ],
  templateUrl: './orders.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Orders {
  readonly limit = signal<number>(4);
  readonly totalCount = signal<number>(16);
  readonly waitingCount = signal<number>(3);
  readonly completedCount = signal<number>(13);
  readonly result = httpResource<OrderModel[]>(() => {
    const endpoint = `api/orders?userId=${this.#common.user()?.id}&_limit=${this.limit()}`;
    return endpoint;
  });
  readonly data = computed(() => this.result.value() ?? []);
  readonly total = computed(() => {
    let total = 0;
    this.data().forEach(val => {
      val.baskets.forEach(d => total += (d.productPrice * d.quantity) * 1.18)
    })

    return total;
  });


  readonly #common = inject(Common);

  showMore(){
    this.limit.update(prev => prev + 4);
  }
}
