import { useCountStore } from "@/auth/auth.store"
import { Button } from "@/components/ui/button"


export  function ProductPage() {
  const {count,inc} = useCountStore()
  
  return (
    <>
      <h1>Numero {count}</h1>
      <Button onClick={inc}>Incrementar</Button>
    </>
  )
}
