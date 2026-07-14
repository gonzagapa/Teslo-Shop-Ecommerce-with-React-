interface Props{
    user:string
}

export const UserIcon = ({user}:Props) => {
  return (
    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
            {user}
    </div>
  )
}
