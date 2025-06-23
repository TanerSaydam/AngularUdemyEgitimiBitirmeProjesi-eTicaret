export interface BasketModel{
    id?:string;
    userId: string;
    productId: string;
    productName: string;
    productImageUrl: string;
    productPrice: number;
    quantity: number;
}