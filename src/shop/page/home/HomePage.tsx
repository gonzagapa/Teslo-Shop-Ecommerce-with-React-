import { products } from "@/mocks/product";
import { CustomJobotrom } from "@/shop/components/CustomJobotrom";
import CustomPagination from "@/shop/components/CustomPagination";
import { ProductGrid } from "@/shop/components/ProductGrid";


export function HomePage() {
  return (
    <div>
     <CustomJobotrom title="Todos los productos"/>
      <ProductGrid products={products}/>
     <CustomPagination totalPages={7}/>
    </div>
  )
}
