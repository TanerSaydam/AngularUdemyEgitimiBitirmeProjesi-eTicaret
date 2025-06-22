import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { Common } from '../../services/common';
import { BreadcrumbModel } from '../layouts/breadcrumb';

@Component({
  imports: [Blank],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Home {}
