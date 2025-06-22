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
        title: "Kategoriler",
        url: "/categories",
        icon: "category"
    },
    {
        title: "Ürünler",
        url: "/products",
        icon: "deployed_code"
    },
    {
        title: "Kullanıcılar",
        url: "/users",
        icon: "group"
    }
]