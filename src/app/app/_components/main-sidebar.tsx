'use client'
import { Session } from 'next-auth'
import { usePathname } from 'next/navigation'
import { HomeIcon, MixerVerticalIcon } from '@radix-ui/react-icons'

import {
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
  DashboardSidebarNavHeader,
  DashboardSidebarNavHeaderTitle,
  DashboardSidebarFooter,
} from '@/components/dashboard/sidebar'
import { Logo } from '@/components/logo'

import { UserDropDown } from './user-dropdown'

type Props = {
  user?: Session['user']
}

export function MainSidebar({ user }: Props) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  if (!user) return

  return (
    <DashboardSidebar>
      <DashboardSidebarHeader>
        <Logo />
      </DashboardSidebarHeader>

      <DashboardSidebarMain className="flex flex-col flex-grow">
        <DashboardSidebarNav>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink active={isActive('/app')} href="/app">
              <HomeIcon className="w-3 h-3 mr-3" />
              Tarefas
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              active={isActive('/app/settings')}
              href="/app/settings"
            >
              <MixerVerticalIcon className="w-3 h-3 mr-3" />
              Configurações
            </DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>

        <DashboardSidebarNav className="mt-auto">
          <DashboardSidebarNavHeader>
            <DashboardSidebarNavHeaderTitle>
              Links extras
            </DashboardSidebarNavHeaderTitle>
          </DashboardSidebarNavHeader>

          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/app">
              Precisa de ajuda?
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/app/settings">
              Site
            </DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
      </DashboardSidebarMain>

      <DashboardSidebarFooter>
        <UserDropDown user={user} />
      </DashboardSidebarFooter>
    </DashboardSidebar>
  )
}
