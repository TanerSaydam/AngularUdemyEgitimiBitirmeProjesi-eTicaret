import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Blank from 'apps/admin/src/components/blank';
import { FlexiToastService } from 'flexi-toast';
import { NgxMaskDirective } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import { initialProduct, ProductModel } from '@shared/models/product.model';
import { CategoryModel } from '@shared/models/category.model';
import { FlexiSelectModule } from 'flexi-select';
import { BreadcrumbModel } from '../../layouts/breadcrumb';

@Component({
  imports: [
    Blank,
    FormsModule,
    FlexiSelectModule,
    NgxMaskDirective
  ],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProductCreate {
  readonly id = signal<string | undefined>(undefined);
  readonly breadcrumbs = signal<BreadcrumbModel[]>([
    {title: 'Ürünler', url: '/products', icon: 'deployed_code'}
  ]);
  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      var res = await lastValueFrom(
        this.#http.get<ProductModel>(`api/products/${this.id()}`)
      );
       this.breadcrumbs.update(prev => [...prev,
          {title: res.name, url: `/products/edit/${this.id()}`, icon: 'edit'},]);
      return res;
    }
  });
  readonly data = linkedSignal(() => this.result.value() ?? {...initialProduct});
  readonly title = computed(() => this.id() ? 'Ürün Güncelle' : 'Ürün Ekle');
  readonly btnName = computed(() => this.id() ? 'Güncelle' : 'Kaydet');

  readonly categoryResult = httpResource<CategoryModel[]>(() => "api/categories");
  readonly categories = computed(() => this.categoryResult.value() ?? []);
  readonly categoryLoading = computed(() => this.categoryResult.isLoading());

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  readonly #activate = inject(ActivatedRoute);

  constructor(){
    this.#activate.params.subscribe(res => {
      if(res["id"]){
        this.id.set(res["id"]);
      }else{
        this.breadcrumbs.update(prev => [...prev,
          {title: 'Ekle', url: '/products/create', icon: 'add'},])
      }
    })
  }

  save(form:NgForm){
    if(!form.valid) return;

    if(!this.id()){
      this.#http.post("http://localhost:3000/products", this.data()).subscribe(() => {
        this.#router.navigateByUrl("/products");
        this.#toast.showToast("Başarılı","Ürün başarıyla eklendi","success");
      });
    }else{
      this.#http.put(`http://localhost:3000/products/${this.id()}`, this.data()).subscribe(() => {
        this.#router.navigateByUrl("/products");
        this.#toast.showToast("Başarılı","Ürün başarıyla güncellendi","info");
      });
    }
  }

  setCategoryName(){
    const id = this.data().categoryId;
    const category = this.categories().find(p => p.id == id);
    this.data.update((prev) => ({
      ...prev,
      categoryName: category?.name ?? "",
      categoryUrl: category?.url ?? ""
    }));
  }
}
