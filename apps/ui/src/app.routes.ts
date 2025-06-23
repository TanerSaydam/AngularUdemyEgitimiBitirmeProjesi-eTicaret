import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./pages/layouts/layouts'),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home')
            },
            {
                path: ':categoryKey',
                loadComponent: () => import('./pages/home/home')
            }
        ]
    }
];
