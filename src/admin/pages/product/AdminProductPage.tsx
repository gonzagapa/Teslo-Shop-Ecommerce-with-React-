import { Navigate, useNavigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { FullScreenLoading } from '@/components/custom/FullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/types/product.interface';
import { toast } from 'sonner';

export const AdminProductPage = () => {
  const { idSlug } = useParams();
  const navigate = useNavigate()
  const {data:product, isLoading, isError, mutation} = useProduct(idSlug ?? '') 

  const handleProductSubmit = async(productLike:Partial<Product>)=>{
        mutation.mutate(productLike,{
            onSuccess:(data:Product)=>{
                toast.success('Producto actualizado exitosamente');
                navigate(`/admin/products/${data.id}`)
            },
            onError:()=>{
                toast.error(`Sucedio un error al actualizar`,)
            }
        })
        
    }

  const title = idSlug === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    idSlug === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  if(isLoading){
    return <FullScreenLoading/>
  }
  
  if(isError){
    return (<Navigate to={'/admin/products'}/>)
  }

  if(!product) {
    return (<Navigate to={'/admin/products'}/>)
  }

  return <ProductForm 
  isSubmittedPending={mutation.isPending} 
  onSubmitForm={handleProductSubmit} 
  product={product} 
  title={title} 
  subtitle={subtitle}/>
  
};