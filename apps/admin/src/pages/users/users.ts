import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridModule } from 'flexi-grid';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';

export interface UserModel{
  id?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const initialUser:UserModel = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  isAdmin: false,

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

@Component({
  imports: [
    Blank,
    FlexiGridModule,
    RouterLink
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
}
