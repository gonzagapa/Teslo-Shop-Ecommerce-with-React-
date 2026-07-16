import { getProductById } from "@/actions/get-product-by-id.action"
import { useQuery } from "@tanstack/react-query"

export const useProduct = (id:string) => {
    
    const query = useQuery({
        queryKey:['product', id],
        queryFn: () => getProductById(id),
        staleTime: 1000 * 60,
        retry:false
    })
  
    return {
        ...query
  }
}
