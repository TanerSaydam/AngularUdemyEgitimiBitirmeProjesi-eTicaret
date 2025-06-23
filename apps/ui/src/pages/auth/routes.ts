import { Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadComponent:() => import('./auth-layout/auth-layout'),
        children: [
            {
                path: 'register',
                loadComponent: () => import("./register/register")
            },
            {
                path: 'login',
                loadComponent: () => import("./login/login")
            }
        ]
    }
]

export default routes;