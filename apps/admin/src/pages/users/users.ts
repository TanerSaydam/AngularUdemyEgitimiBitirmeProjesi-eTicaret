import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridModule } from 'flexi-grid';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { FormsModule } from '@angular/forms';
import { UserModel } from '@shared/models/user.model';

@Component({
  imports: [
    Blank,
    FlexiGridModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './users.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Users {
  readonly result = httpResource<UserModel[]>(() => "api/users");
  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());

  readonly #toast = inject(FlexiToastService);
  readonly #http = inject(HttpClient);

  delete(id: string){
    this.#toast.showSwal("Kullanıcıyı Sil?","Kullanıcı silmek istiyor musunuz?","Sil",() => {
      this.#http.delete(`api/users/${id}`).subscribe(()=> {
        this.result.reload();
      })
    })
  }

  changeIsAdmin(data:UserModel){
    this.#http.put(`api/users/${data.id}`,data).subscribe(() => {
      this.result.reload();
    });
  }
}
