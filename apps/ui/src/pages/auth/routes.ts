import { Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadComponent:() => import('./auth-layout/auth-layout'),
        children: [
            {
                path: 'register',
                loadComponent: () => import("./register/register")
            }
        ]
    }
]

export default routes;