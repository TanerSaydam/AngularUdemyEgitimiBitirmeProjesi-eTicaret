import { BasketModel } from "./basket.model";

export interface OrderModel {
    id?: string;
    userId: string;
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
    fullName: "",
    phoneNumber: "",
    city: "",
    district: "",
    fullAddress: "",
    cartNumber: "",
    cartOwnerName: "",
    expiresDate: "",
    cvv: 0,
    installmentOptions: "",
    status: "Onay Bekliyor",
    baskets: []
}