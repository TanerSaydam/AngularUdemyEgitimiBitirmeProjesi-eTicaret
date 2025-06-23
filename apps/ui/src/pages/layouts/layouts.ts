import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CategoryModel } from '@shared/models/category.model';

@Component({
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Layouts {
  readonly result = httpResource<CategoryModel[]>(() => "api/categories");
  readonly data = computed(() => this.result.value() ?? []);

  readonly #router = inject(Router);

  logout(){
    localStorage.clear();
    this.#router.navigateByUrl("/auth/login");
  }
}
