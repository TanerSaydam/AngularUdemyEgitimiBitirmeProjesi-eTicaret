import { ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation } from '@angular/core';
import Breadcrumb from './breadcrumb';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navigations } from '../../navigation';
import { NavPipe } from '../../pipes/nav-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    Breadcrumb,
    RouterLink,
    RouterLinkActive,
    NavPipe,
    FormsModule
  ],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Layouts {
  readonly search = signal<string>("");
  readonly navigations = computed(() => navigations);
}
