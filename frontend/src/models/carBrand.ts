import { carModel } from "./carModel";

export interface carBrand {
    brand_name: String;
    car_model_items: [carModel];
    id:number;
    logo?: String;
}