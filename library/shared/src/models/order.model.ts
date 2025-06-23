import { BasketModel } from "./basket.model";

export interface OrderModel {
    id?: string;
    userId: string;
    orderNumber:string;
    date: Date;
    fullName: string;
    phoneNumber: string;
    city: string;
    district: string;
    fullAddress: string;
    cartNumber: string;
    cartOwnerName: string;
    expiresDate: string;
    cvv: number;
    installmentOptions: string;
    status:string;
    baskets: BasketModel[];
}

export const initialOrder: OrderModel = {
    userId: "",
    orderNumber: "",
    date: new Date(),
    fullName: "",
    phoneNumber: "",
    city: "",
    district: "",
    fullAddress: "",
    cartNumber: "",
    cartOwnerName: "",
    expiresDate: "",
    cvv: 300,
    installmentOptions: "Tek Çekim",
    status: "Hazırlanıyor",
    baskets: []
}