import { apiTeslo } from "@/api/api.teslo"
import type { ProductResponse } from "@/types/products.response";

export const getProductsAction = async():Promise<ProductResponse>=>{
    const {data} = await apiTeslo.get<ProductResponse>("/products");

    const productWithImages = data.products.map(product => ({
        ...product,
        images: product.images.map(image => `${import.meta.env.VITE_API_URL}/files/product/${image}`)
    }))

    return {
       ...data,
        products:productWithImages
    }
}