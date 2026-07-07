import { Button } from "@/components/ui/button";

export function CustomJobotrom({title}:{title:string}) {
  return (
    <section className="py-16 px-4 lg:px-8 bg-muted/30">
        <div className="container mx-auto text-center">
          <h1 className="font-montserrat text-5xl lg:text-7xl font-light tracking-tight mb-6">
           {title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ropa minimalista y elegante inspirada en el diseño futurista de Tesla. 
            Calidad premium para un estilo atemporal.
          </p>
          <Button size="lg" className="rounded-full px-8">
            Explorar Colección
          </Button>
        </div>
      </section>
  )
}
