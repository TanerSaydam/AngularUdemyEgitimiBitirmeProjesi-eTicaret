import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridModule } from 'flexi-grid';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { api } from '../../constants';

export interface CategoryModel{
  id?: string;
  name: string;
}

export const initialCategory: CategoryModel = {
  name: ""
}

@Component({
  imports: [
    Blank,
    FlexiGridModule,
    RouterLink
  ],
  templateUrl: './categories.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Categories {
  readonly result = httpResource<CategoryModel[]>(() => `api/categories`);

  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);

  delete(id: string){
    this.#toast.showSwal("Kategori sil?", "Kategoriyi silmek istiyor musunuz?","Sil",() => {
      this.#http.delete(`api/categories/${id}`).subscribe(()=> {
        this.result.reload();
      });
    })
  }
}
