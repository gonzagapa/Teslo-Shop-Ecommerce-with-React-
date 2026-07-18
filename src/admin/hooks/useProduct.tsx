import { getProductById } from "@/actions/get-product-by-id.action"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createUpdateProductAction } from "../action/create-update-product.action"
import type { Product } from "@/types/product.interface"


export const useProduct = (id:string) => {
    
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey:['product', id],
        queryFn: () => getProductById(id),
        staleTime: 1000 * 60,
        retry:false
    })

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: async (data:Product)=>{


            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey:['products'],
                }),

                queryClient.invalidateQueries({
                    queryKey:['product', {id:data.id}]
                })
            ])

            queryClient.setQueryData(['product', {id:data.id}],data)
        }
    })

  
    return {
        ...query,
        mutation
  }
}
