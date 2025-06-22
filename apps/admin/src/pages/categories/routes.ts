import { Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./categories")
    }
]

export default routes;