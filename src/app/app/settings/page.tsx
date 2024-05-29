import {
  DashboardPage,
  DashboardPageMain,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
} from '@/components/dashboard/page'

export default async function Settings() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Configurações</DashboardPageHeaderTitle>
      </DashboardPageHeader>

      <DashboardPageMain>
        <main className="flex justify-center bg-background items-center h-screen"></main>
      </DashboardPageMain>
    </DashboardPage>
  )
}
