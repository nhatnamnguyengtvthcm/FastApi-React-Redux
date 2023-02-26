import { carModel } from "./carModel";

export interface carBrand {
    brand_name: String;
    car_model_items?: [carModel];
    descriptions: String;
    id:number;
    logo?: String;
}