import axios from "axios";
import axiosClient from './axiosClient';
import axiosFormClient from './axiosFormClient';
import { carBrand } from '../models';
import { ListParams, ListRespone } from "../models/common";
import { carBrandLogoState } from "../features/carbrand/pages/carBrand\bLogoSlice";
// import FormData from 'form-data'
// baseUrl = http://127.0.0.1:8000

// const axiosClient = axios.create

const carBrandApi = {
    getAll(params: ListParams): Promise<[ListRespone<carBrand>]>
    {
        const url  = 'carbrands/'
        return axiosClient.get(url,{params})
    },

    createCarBrand(data:carBrand): Promise<carBrand>{
        const url = 'carbrands/';
        return axiosClient.post(url,data)

    },
    uploadLogo(brandcarId: number, data:File): Promise<carBrand>{
        const form = new FormData();

        form.append('file', data, data.name);
        console.log("form:", form);
        console.log("data:", data);
        console.log("data.name:", data.name);
        const url = `carbrands/upload_logo/${brandcarId}`;
        return axiosClient.post(url, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }) 
    },
    updateCarbrand(data:Partial<carBrand>): Promise<carBrand>{
        const url = `carbrands/${data.id}`;
        return axiosClient.put(url,data)

    },
    removeCarbrand(brandcarId: number):Promise<number>{
        const url = `carbrands/${brandcarId}`;
        return axiosClient.delete(url)
    }

}

export default carBrandApi;