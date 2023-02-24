import axios from "axios";
import axiosClient from './axiosClient';
import axiosFormClient from './axiosFormClient';
import { carModel } from '../models';
// baseUrl = http://127.0.0.1:8000

// const axiosClient = axios.create

const carModelApi = {
   
    getAll(skip:number=0, limit:number=100): Promise<[carModel]>
    {
        const url  = 'carbrands/';
        return axiosClient.get(url,{params:{skip, limit}})
    },
    getByCarBrandId(car_brand_id:number){
        const url  = `carbrands/${car_brand_id}`;
        return axiosClient.get(url)

    },
    createCarModel(){},
    upload_image(){},

}

export default carModelApi;