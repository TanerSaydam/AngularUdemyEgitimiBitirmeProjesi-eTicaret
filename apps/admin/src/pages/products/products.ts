import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { CategoryModel } from '../categories/categories';

export interface ProductModel{
  id?: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName: string;
}

export const initialProduct: ProductModel = {
  name: "",
  imageUrl: "",
  price: 0,
  stock: 0,
  categoryId: "123",
  categoryName: "Telefon"
}

@Component({
  imports: [
    Blank,
    FlexiGridModule,
    RouterLink
  ],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Products {
  readonly result = httpResource<ProductModel[]>(() => "api/products");
  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());

  readonly categoryResult = httpResource<CategoryModel[]>(() => "api/categories");
  readonly categoryFilter = computed<FlexiGridFilterDataModel[]>(() => {
    const categories = this.categoryResult.value() ?? [];
    return categories.map<FlexiGridFilterDataModel>(
        (val) =>
          ({name: val.name, value: val.name}));
  });

  readonly #toast = inject(FlexiToastService);
  readonly #http = inject(HttpClient);

  delete(id: string){
    this.#toast.showSwal("Ürünü Sil?","Ürünü silmek istiyor musunuz?","Sil",() => {
      this.#http.delete(`api/products/${id}`).subscribe(res => {
        this.result.reload();
      });
    });
  }
}
