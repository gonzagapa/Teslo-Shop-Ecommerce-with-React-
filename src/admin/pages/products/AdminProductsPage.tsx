import { TableRowProducts } from "@/admin/components/TableRowProducts";
import { WelcomeSection } from "@/admin/components/WelcomeSection";
import { Button } from "@/components/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import { useProducts } from "@/hooks/useProducts";
import CustomPagination from "@/shop/components/CustomPagination";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export function AdminProductsPage() {

  const {data} = useProducts()

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <WelcomeSection title="Productos" message="Aquí puedes ver y administrar tus productos"/>
        <Link to={"/admin/products/new"}>
          <Button>
            <PlusIcon/>
            Nuevo producto
          </Button>
        </Link>
      </div>

    <Table className="bg-white border-2 border-gray-200 shadow-xs mb-10">
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Imagen</TableHead>
          <TableHead className="font-bold">Nombre</TableHead>
          <TableHead className="font-bold">Precio</TableHead>
          <TableHead className="font-bold">Categoria</TableHead>
          <TableHead className="font-bold">Inventario</TableHead>
          <TableHead className="font-bold">Tallas</TableHead>
          <TableHead className="font-bold">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
       {data?.products && data.products.map((product,index)=>(
        <TableRowProducts 
          key={product.id} 
          image={product.images} 
          price={product.price}
          name={product.title}
          stock={product.stock}
          gender={product.gender}
          sizes={product.sizes}/>
       ))}
      </TableBody>
    </Table>

    <CustomPagination totalPages={data?.pages ?? 0}/>
    </div>
  )
}
