import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  template: `
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <a routerLink="/" class="d-flex align-items-center">
        <span class="material-symbols-outlined">home</span>
        <span>Ana Sayfa</span>
      </a>
    </li>
  </ol>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Breadcrumb {

}
