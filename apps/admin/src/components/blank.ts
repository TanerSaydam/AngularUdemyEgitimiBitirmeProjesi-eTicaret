import { AfterViewInit, ChangeDetectionStrategy, Component, inject, input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { BreadcrumbModel } from '../pages/layouts/breadcrumb';
import { Common } from '../services/common';

@Component({
  selector: 'app-blank',
  imports: [],
  template: `
    <title>e-Ticaret Admin | {{pageTitle()}}</title>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Blank implements OnChanges{
  readonly pageTitle = input.required<string>();
  readonly breadcrumbs = input.required<BreadcrumbModel[]>();

  readonly #common = inject(Common);

  ngOnChanges(changes: SimpleChanges): void {
    this.#common.set(this.breadcrumbs());
  }
}
