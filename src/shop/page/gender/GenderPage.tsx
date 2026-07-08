import { products } from "@/mocks/product";
import { CustomJobotrom } from "@/shop/components/CustomJobotrom";
import CustomPagination from "@/shop/components/CustomPagination";
import { ProductGrid } from "@/shop/components/ProductGrid";
import { useParams } from "react-router";



export function GenderPage() {
  const { gender } = useParams();
  // TODO: Cargar productos por género

  return (
   <>
     <CustomJobotrom title={`Todos los productos para ${gender}`}/>
      <ProductGrid products={products}/>
     <CustomPagination totalPages={7}/>
   </>
  )
}
