import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { initialUser, UserModel } from '../users';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { FormsModule, NgForm } from '@angular/forms';
import Blank from 'apps/admin/src/components/blank';

@Component({
  imports: [
    Blank,
    FormsModule
  ],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CreateUser {
  readonly id = signal<string | undefined>(undefined);
  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      var res = await lastValueFrom(this.#http.get<UserModel>(`api/users/${this.id()}`));
      return res;
    }
  });
  readonly data = linkedSignal(() => this.result.value() ?? {...initialUser});
  readonly cardTitle = computed(() => this.id() ? 'Kullanıcı Güncelle' : 'Kullanıcı Ekle');
  readonly btnName = computed(() => this.id() ? 'Güncelle' : 'Kaydet');

  readonly #http = inject(HttpClient);
  readonly #activated = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);

  constructor(){
    this.#activated.params.subscribe(res => {
      if(res['id']){
        this.id.set(res['id']);
      }
    });
  }

  save(form:NgForm){
    if(!form.valid) return;

    this.data.update((prev) => 
        ({...prev, fullName: `${prev.firstName} ${prev.lastName}`}));

    if(!this.id()){
      this.#http.post("api/users", this.data()).subscribe(res => {
        this.#toast.showToast("Başarılı","Kullanıcı başarıyla kaydedildi");
        this.#router.navigateByUrl("/users");
      });
    }else{
      this.#http.put(`api/users/${this.id()}`, this.data()).subscribe(res => {
        this.#toast.showToast("Başarılı","Kullanıcı başarıyla güncellendi");
        this.#router.navigateByUrl("/users");
      });
    }
  }

}
