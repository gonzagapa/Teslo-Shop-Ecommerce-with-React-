import { CustomJobotrom } from "@/shop/components/CustomJobotrom";
import CustomPagination from "@/shop/components/CustomPagination";
import { ProductGrid } from "@/shop/components/ProductGrid";
import { useProducts } from "@/shop/hooks/useProducts";


export function HomePage() {

  const {data,isLoading,isError } = useProducts()

  
  
  return (
    <div>
     <CustomJobotrom title="Todos los productos"/>
      {isLoading ? (<p>Cargando...</p>): <ProductGrid products={data?.products ?? []}/>}
      {isLoading ? (<p>Cargando...</p>): <CustomPagination totalPages={data?.count ?? 0}/>}
    </div>
  )
}
