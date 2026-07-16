import { Navigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { FullScreenLoading } from '@/components/custom/FullScreenLoading';
import { ProductForm } from './ui/ProductForm';

export const AdminProductPage = () => {
  const { idSlug } = useParams();
  const {data:product, isLoading, isError} = useProduct(idSlug ?? '')

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

  console.log({product,isLoading});

  return <ProductForm product={product} title={title} subtitle={subtitle}/>
  
};