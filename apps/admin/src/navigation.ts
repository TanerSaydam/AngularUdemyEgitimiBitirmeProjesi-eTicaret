export interface NavigationModel{
    title: string;
    url: string;
    icon: string;
}

export const navigations: NavigationModel[] = [
    {
        title: "Ana Sayfa",
        url: "/",
        icon: "home"
    },
    {
        title: "Ürünler",
        url: "/products",
        icon: "deployed_code"
    },
    {
        title: "Kategoriler",
        url: "/categories",
        icon: "category"
    }
]