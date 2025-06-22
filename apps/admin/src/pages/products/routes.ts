import { Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./products')
    },
    {
        path: 'create',
        loadComponent: () => import("./create/create")
    },
    {
        path: 'edit/:id',
        loadComponent: () => import("./create/create")
    }
]

export default routes;