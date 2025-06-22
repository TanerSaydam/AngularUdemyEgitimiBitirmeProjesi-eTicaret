import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridModule } from 'flexi-grid';

export interface ProductModel{
  id?: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
}

@Component({
  imports: [
    Blank,
    FlexiGridModule
  ],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Products {
  readonly data = signal<ProductModel[]>([
    {
      imageUrl: 'https://ffo3gv1cf3ir.merlincdn.net//SiteAssets/pasaj/crop/cg/1698313241770/1698313246580/1698313246580_600x450.png?1749680495000',
      name: 'Iphone 15 Pro',
      price: 100000,
      stock: 15
    }
  ]);
}
