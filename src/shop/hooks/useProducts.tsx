import { useQuery } from "@tanstack/react-query"
import { getProductsAction } from "../actions/get-products.action"
import { useSearchParams } from "react-router"


export const useProducts = (gender?:string) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const limit = searchParams.get("limit") ?? 9 ; 
    const page = searchParams.get("page") ?? 1;
    const sizes = searchParams.get("sizes")?.split(',') ?? []  
    const price = searchParams.get('price') ?? "any";
    const query = searchParams.get('query') ?? undefined;
    
    const offset = (Number(page) - 1) * Number(limit);
    const sizeOp = sizes.join(",").trim()
    
    let maxPrice = 0;


    switch(price){
        case "0": 
            maxPrice = 50;
            break; 
        case "50":
            maxPrice = 100
            break; 
        case "100": 
            maxPrice = 200
            break; 
        default:
            maxPrice = 200;

    }


    return useQuery({
        queryKey:['products',{offset, limit, sizes, gender, price,query}],
        queryFn:()=>getProductsAction(
            {
                limit:isNaN(+limit) ? 9: limit,
                offset:isNaN(+offset) ? 0: offset,
                sizes:sizeOp.length == 0 ? undefined : sizeOp,
                gender:gender,
                maxPrice: maxPrice,
                minPrice: isNaN(+price) ? 0 : Number(price),
                q:query
            }
        ),
        staleTime: 1000*60*5
    })
}
