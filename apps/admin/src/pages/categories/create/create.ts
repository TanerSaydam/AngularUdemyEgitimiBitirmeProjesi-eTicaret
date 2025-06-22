import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import Blank from 'apps/admin/src/components/blank';
import { CategoryModel, initialCategory } from '../categories';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FlexiToastService } from 'flexi-toast';
import { lastValueFrom } from 'rxjs';

@Component({
  imports: [
    Blank,
    FormsModule
  ],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CreateCategory {
  readonly id = signal<string | undefined>(undefined);
  readonly cardTitle = computed(() => this.id() ? 'Kategori Güncelle' : 'Kategori Ekle');
  readonly btnName = computed(() => this.id() ? 'Güncelle' : 'Kaydet');

  readonly result = resource({
    params: () => this.id(),
    loader: async() => {
      var res = await lastValueFrom(
        this.#http.get<CategoryModel>(`http://localhost:3000/categories/${this.id()}`)
      );

      return res;
    }
  })
  readonly data = linkedSignal(() => this.result.value() ?? initialCategory);

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #activated = inject(ActivatedRoute);
  readonly #router = inject(Router);

  constructor(){
    this.#activated.params.subscribe((res) => {
      if(res['id']){
        this.id.set(res['id']);
      }else{
        this.data.set(initialCategory);
      }
    });
  }

  save(form: NgForm){
    if(!form.valid) return;

    if(!this.id()){
      this.#http.post("http://localhost:3000/categories", this.data()).subscribe(res => {
        this.#toast.showToast("Başarılı","Kategori kaydı başarıyla tamamlandı");
        this.#router.navigateByUrl("/categories");
      });
    }else{
      this.#http.put(`http://localhost:3000/categories/${this.id()}`, this.data()).subscribe(res => {
        this.#toast.showToast("Başarılı","Kategori kaydı başarıyla güncellendi");
        this.#router.navigateByUrl("/categories");
      });
    }
  }
}
