import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink, useSearchParams } from "react-router";


export  function CustomHeader() {

    const [searchParams,setSearchParams] = useSearchParams()
    const inputSearchValue = searchParams.get("search") ?? ""
    const [cartCount,] = useState(3);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event:React.KeyboardEvent<HTMLInputElement>)=>{
      if(event.key !== "Enter") return; 

      const inputValue = inputRef.current.value
      const newSearchParams = new URLSearchParams();

      if(inputValue.trim().length == 0 ) {
        newSearchParams.delete('search')
      }else{

        newSearchParams.set('search',inputValue); 
      }

      setSearchParams(newSearchParams);

    }

    
    
  return <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold tracking-tight">TESLA STYLE</h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({isActive})=>`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'underline underline-offset-4' : ''}`}>
              Todos
            </NavLink>
            <NavLink to="/gender/hombre" className={({isActive})=>`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'underline underline-offset-4' : ''}`}>
              Hombre
            </NavLink>
            <NavLink to="/gender/mujer" className={({isActive})=>`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'underline underline-offset-4' : ''}`}>
              Mujer
            </NavLink>
            <NavLink to="/gender/ninos" className={({isActive})=>`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'underline underline-offset-4' : ''}`}>
              Niños
            </NavLink>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input ref={inputRef} 
                defaultValue={inputSearchValue}
                onKeyDown={handleInputChange}
                placeholder="Buscar productos..." className="pl-9 w-64 h-9 bg-white" />
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cartCount}
                </span>}
            </Button>
          </div>
        </div>
      </div>
    </header>;
}
