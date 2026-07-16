import React, { useRef } from 'react';
import { Search, Bell, MessageSquare, Settings } from 'lucide-react';
import { UserIcon } from './UserIcon';
import { useAuthStore } from '@/auth/auth.store';
import { useSearchParams } from 'react-router';

const AdminHeader: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [searchParams,setSearchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    const inputValue = inputRef.current?.value
    
    if(e.key !== "Enter" || (typeof inputValue == 'undefined' || inputValue.trim().length < 3)) {
      searchParams.delete("query")
      setSearchParams(searchParams)
    }else{
      const queryParams = new URLSearchParams({"query":inputValue})
      setSearchParams(queryParams);
    }   

  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 h-18">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              onKeyDown={(e)=>handleKeyDown(e)}
              type="text"
              ref={inputRef}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageSquare size={20} />
          </button>
          
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
          {

           user && <UserIcon user={user.fullName.slice(0,2).toUpperCase()}/>
          }
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;