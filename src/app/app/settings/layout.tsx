import { PropsWithChildren } from 'react'

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'
import { SettingsSidebar } from './_components/settings-sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Configurações</DashboardPageHeaderTitle>
      </DashboardPageHeader>

      <DashboardPageMain>
        <div className="div container max-screen md">
          <div className="grid grid-cols-[16rem_1fr] gap-12">
            <SettingsSidebar />
            <div className="w-3/4">{children}</div>
          </div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  )
}
