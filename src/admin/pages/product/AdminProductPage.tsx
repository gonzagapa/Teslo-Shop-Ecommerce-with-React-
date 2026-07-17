import { Navigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { FullScreenLoading } from '@/components/custom/FullScreenLoading';
import { ProductForm } from './ui/ProductForm';

export const AdminProductPage = () => {
  const { idSlug } = useParams();
  const {data:product, isLoading, isError, handleProductSubmit} = useProduct(idSlug ?? '') 

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

  return <ProductForm onSubmitForm={handleProductSubmit} product={product} title={title} subtitle={subtitle}/>
  
};