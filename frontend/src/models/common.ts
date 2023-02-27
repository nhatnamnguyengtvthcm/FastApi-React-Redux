export interface PaginationParams {
    limit: number;
    total: number;
    offset: number
    page?: number;
   
}

export interface ListRespone<T>{
    items: T[];
    // pagination?: PaginationParams
    total: number;
    limit: number;
    offset: number
}



export interface ListParams {
    limit?: number;
    page?: number;
    total?: number;
    offset?: number;
    brand_name?:string;
}

