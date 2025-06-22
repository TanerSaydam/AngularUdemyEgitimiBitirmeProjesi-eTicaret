import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'login',
        loadComponent: () => import("./pages/login/login")
    },
    {
        path: '',
        loadComponent: () => import("./pages/layouts/layouts"),
        children: [
            {
                path: '',
                loadComponent:() => import("./pages/home/home")
            },
            {
                path: 'products',
                loadComponent: () => import('./pages/products/products')
            },
            {
                path: 'products/create',
                loadComponent:() => import("./pages/products/create/create")
            }
        ]
    }
];
