import { Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadComponent:() => import("./users")
    }
]

export default routes;