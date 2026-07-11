import { useQuery } from "@tanstack/react-query"
import { getProductsAction } from "../actions/get-products.action"
import { useSearchParams } from "react-router"


export const useProducts = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const limit = searchParams.get("limit") ?? 9 ; 
    const page = searchParams.get("page") ?? 1;
    const sizes = searchParams.get("sizes")?.split(',') ?? [] 
    
    const offset = (Number(page) - 1) * Number(limit);

    const sizeOp = sizes.join(",").trim()

    return useQuery({
        queryKey:['products',{offset, limit, sizes}],
        queryFn:()=>getProductsAction(
            {
                limit:isNaN(+limit) ? 9: limit,
                offset:isNaN(+offset) ? 0: offset,
                sizes:sizeOp.length == 0 ? undefined : sizeOp
            }
        ),
        staleTime: 1000*60*5
    })
}
