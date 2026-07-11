import { apiTeslo } from "@/api/api.teslo"
import type { ProductResponse } from "@/types/products.response";

interface Options {
    limit?: string | number, 
    offset?: string | number,
    sizes?:string,
    gender?:string,
    minPrice?: number | string, 
    maxPrice?: number,
    q?:string
}
type OptionsKey = keyof Options;  



export const getProductsAction = async(option:Options):Promise<ProductResponse>=>{

    const queryparams:any = {}

    for(let key  in option ){
        if(typeof option[key as OptionsKey] == "undefined") continue; 

        queryparams[key] = option[key as OptionsKey] 
    }
    
    const {data} = await apiTeslo.get<ProductResponse>(`/products?${new URLSearchParams({...queryparams}).toString()}`);

    const productWithImages = data.products.map(product => ({
        ...product,
        images: product.images.map(image => `${import.meta.env.VITE_API_URL}/files/product/${image}`)
    }))

    return {
       ...data,
        products:productWithImages
    }
}