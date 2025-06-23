import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BasketModel } from '@shared/models/basket.model';
import { UserModel } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Common {
  readonly user = signal<UserModel | undefined>(undefined);
  readonly basketCount = signal<number>(0);

  readonly #http = inject(HttpClient);

  constructor(){
    this.getBasketCount();
    const response: string | null = localStorage.getItem("response");
    if(response){
      this.user.set(JSON.parse(response));
    }
  }

  getBasketCount(){
    if(this.user()){
      const endpoint = `api/baskets?userId=${this.user()!.id}`
      this.#http.get<BasketModel[]>(endpoint).subscribe(res =>
            this.basketCount.set(res.length));
    }
  }
}
