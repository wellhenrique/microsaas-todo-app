import { CubeIcon } from '@radix-ui/react-icons'

export function Logo() {
  return (
    <div className="bg-primary h-8 w-72 flex items-center justify-center rounded-md">
      <CubeIcon className="h-5 w-5 text-gray-100 mr-3" />
      <span className="text-gray-100 text-xs">Todo App</span>
    </div>
  )
}
