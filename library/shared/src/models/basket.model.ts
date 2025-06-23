export interface BasketModel{
    id?:string;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
}

export const initialBasket:BasketModel = {
    productId: "",
    productName: "",
    price: 0,
    quantity: 1
}