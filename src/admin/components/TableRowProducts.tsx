import { TableCell, TableRow } from "@/components/ui/table"
import { Link } from "react-router"

interface Props{
    name:string, 
    price:number,
    gender:string, 
    stock:number, 
    sizes:string[],
    image: string[]
}

export const TableRowProducts = ({name,price,gender,stock,sizes, image}:Props) => {
  return (
     <TableRow>
          <TableCell>
            <img src={`${image[0]}`} alt="producto" className="size-20 object-cover rounded-md" />
          </TableCell>
          <TableCell>{name}</TableCell>
          <TableCell >{price}</TableCell>
          <TableCell >{gender}</TableCell>
          <TableCell >{stock}</TableCell>
          <TableCell >{sizes.join(',')}</TableCell>
          <TableCell >
            <Link to={"/admin/products/edit"}>
              Editar
            </Link>
            </TableCell>
        </TableRow>
  )
}
