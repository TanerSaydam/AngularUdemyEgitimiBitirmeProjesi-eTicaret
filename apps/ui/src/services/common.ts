import { Injectable, signal } from '@angular/core';
import { UserModel } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Common {
  readonly user = signal<UserModel | undefined>(undefined);

  constructor(){
    const response: string | null = localStorage.getItem("response");
    if(response){
      this.user.set(JSON.parse(response));
    }
  }
}
