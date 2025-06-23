import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '@shared/models/user.model';
import { FlexiToastService } from 'flexi-toast';

@Component({
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Login {
  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #router = inject(Router);

  signIn(form: NgForm){
    if(!form.valid) return;

    this.#http.get<UserModel[]>(`api/users?userName=${form.value['userName']}&password=${form.value['password']}`).subscribe(res=> {
      if(res.length === 0){
        this.#toast.showToast("Hata","Kullanıcı adı ya da şifre yanlış","error");
        return;
      }

      const user = res[0];
      localStorage.setItem("response", JSON.stringify(user));
      this.#router.navigateByUrl("/");
    })
  }
}
