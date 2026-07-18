import { apiTeslo } from "@/api/api.teslo";
import type { Product } from "@/types/product.interface";

export const createUpdateProductAction = async (productLike:Partial<Product>): Promise<Product>=>{

    const {id, images, user, ...rest} = productLike; 

    const isCreating = id === "new"; 

    rest.stock = Number(rest.stock ?? 0)
    rest.price = Number(rest.price ?? 0); 

    const {data} = await apiTeslo<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data:rest
    })

    const imagesProduct = data.images.map((image)=>{
        if(image.includes("http")) return image; 

        return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    })

    return {
        ...data,
        images:imagesProduct
    };
}