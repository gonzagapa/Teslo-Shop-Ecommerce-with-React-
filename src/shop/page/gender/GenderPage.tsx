import { CustomJobotrom } from "@/shop/components/CustomJobotrom";
import CustomPagination from "@/shop/components/CustomPagination";
import { ProductGrid } from "@/shop/components/ProductGrid";
import { useProducts } from "@/shop/hooks/useProducts";
import { useParams } from "react-router";



export function GenderPage() {
  const { gender } = useParams();
  const {data} = useProducts(gender);
  // TODO: Cargar productos por género

  return (
   <>
     <CustomJobotrom title={`Todos los productos para ${gender}`}/>
      <ProductGrid products={data?.products ?? []}/>
     <CustomPagination totalPages={data?.pages?? 0}/>
   </>
  )
}
