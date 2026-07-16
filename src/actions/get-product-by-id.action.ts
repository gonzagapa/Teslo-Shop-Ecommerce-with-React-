import { apiTeslo } from "@/api/api.teslo";
import type { Product } from "@/types/product.interface";


export const getProductById = async (id:string): Promise<Product>=>{
    if(!id){
        throw new Error("id is required"); 
    }

    if(id == "new"){
        return {
            id: 'new',
            title: '',
            price: 0,
            description: '',
            slug:'',
            stock:0,
            sizes: [],
            gender: 'men',
            tags: [],
            images: []
        } as unknown as Product
    }

    const {data} = await apiTeslo.get<Product>(`/products/${id}`); 

    data.images = data.images.map((image)=>{
        if(image.includes("http")) return image; 

        return `${import.meta.env.VITE_API_URL}/files/products/${image}`;
    })

    return data;
}