import { Loader2 } from "lucide-react"

export const FullScreenLoading = () => {
  return (
    <div className="flex-col gap-5 fixed inset-0 z-50 flex items-center justify-center bg-background">
      <Loader2 className="size-10 animate-spin text-primary" />
      <p className="tex-center font-bold">Cargando elementos...</p>
    </div>
  )
}
