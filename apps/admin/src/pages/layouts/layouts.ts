import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import Breadcrumb from './breadcrumb';
import { RouterLink } from '@angular/router';

@Component({
  imports: [Breadcrumb, RouterLink],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Layouts {

}
