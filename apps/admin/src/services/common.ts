import { Injectable, signal } from '@angular/core';
import { BreadcrumbModel } from '../pages/layouts/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class Common {
  readonly data = signal<BreadcrumbModel[]>([]);

  set(data:BreadcrumbModel[]){
    const val: BreadcrumbModel = {
      title: "Ana Sayfa",
      icon: "home",
      url: "/"
    }
    this.data.set([val, ...data]);
  }
}
