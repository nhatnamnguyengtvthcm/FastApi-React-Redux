import axios from "axios";
import axiosClient from './axiosClient';
import axiosFormClient from './axiosFormClient';
import { carBrand } from '../models';
import { ListParams, ListRespone } from "../models/common";
// baseUrl = http://127.0.0.1:8000

// const axiosClient = axios.create

const carBrandApi = {
    getAll(params: ListParams): Promise<[ListRespone<carBrand>]>
    {
        const url  = 'carbrands/'
        return axiosClient.get(url,{params})
    },
    createCarBrand(){},
    uploadLogo(){},
    updateCarbrand(){},

}

export default carBrandApi;