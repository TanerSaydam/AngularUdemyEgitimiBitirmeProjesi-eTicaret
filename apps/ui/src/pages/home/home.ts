import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, ViewEncapsulation } from '@angular/core';
import { ProductModel } from '@shared/models/product.model';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  imports: [
    TrCurrencyPipe
  ],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Home {
  readonly result = httpResource<ProductModel[]>(() => "api/products");
  readonly data = computed(() => this.result.value() ?? []);
}
