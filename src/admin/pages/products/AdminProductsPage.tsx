import { WelcomeSection } from "@/admin/components/WelcomeSection";
import { Button } from "@/components/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import CustomPagination from "@/shop/components/CustomPagination";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export function AdminProductsPage() {
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
          <TableHead className="font-bold">ID</TableHead>
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
        <TableRow>
          <TableCell className="font-medium">1</TableCell>
          <TableCell>
            <img src="https://placehold.co/250x250" alt="producto" className="size-20 object-cover rounded-md" />
          </TableCell>
          <TableCell>Playera</TableCell>
          <TableCell >$250.00</TableCell>
          <TableCell >Categoria 1</TableCell>
          <TableCell >100</TableCell>
          <TableCell >X, XL, M, S</TableCell>
          <TableCell >
            <Link to={"/admin/products/edit"}>
              Editar
            </Link>
            </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <CustomPagination totalPages={10}/>
    </div>
  )
}
