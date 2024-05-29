import {
  MixerHorizontalIcon,
  OpenInNewWindowIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import { Session } from 'next-auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from 'next-auth/react'

type Props = {
  user: Session['user']
}

export function UserDropDown({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative hover:bg-primary  group h-14 flex items-center justify-between w-full space-x-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image} alt={user!.name || 'Anonimo'} />
            <AvatarFallback>{user?.name ? user.name[0] : 'A'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 space-y-1 text-left">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground group-hover:text-white">
              {user?.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {user?.name && (
              <p className="text-sm font-medium leading-none">{user?.name}</p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <MixerHorizontalIcon className="w-3 h-3 mr-3" />
            Configurações
          </DropdownMenuItem>

          <DropdownMenuItem>
            <RocketIcon className="w-3 h-3 mr-3" />
            Upgrade
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <OpenInNewWindowIcon className="w-3 h-3 mr-3" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
