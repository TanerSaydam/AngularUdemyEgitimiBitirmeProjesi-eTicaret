import { ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { httpResource } from '@angular/common/http';

export interface ProductModel{
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName: string;
}

@Component({
  imports: [
    Blank,
    FlexiGridModule
  ],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Products {
  readonly result = httpResource<ProductModel[]>(() => "http://localhost:3000/products");
  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());

  readonly categoryFilter = signal<FlexiGridFilterDataModel[]>([
    {
      name: 'Telefon',
      value: 'Telefon'
    }
  ])
}
