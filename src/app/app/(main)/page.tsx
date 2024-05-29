import { PlusIcon } from '@radix-ui/react-icons'

import { getUserTodos } from './actions'

import {
  DashboardPage,
  DashboardPageMain,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageHeaderNav,
} from '@/components/dashboard/page'
import { Button } from '@/components/ui/button'

import { TodoDataTable } from './_components/todo-data-table'
import { TodoUpsertSheet } from './_components/todo-upsert-sheet'

export default async function AppPage() {
  const todos = await getUserTodos()

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Tarefas</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <DashboardPageHeaderNav>
            <TodoUpsertSheet>
              <Button variant="outline" size="sm">
                <PlusIcon className="h-4 w-4 mr-3" />
                Add Todo
              </Button>
            </TodoUpsertSheet>
          </DashboardPageHeaderNav>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>

      <DashboardPageMain>
        <TodoDataTable data={todos} />
      </DashboardPageMain>
    </DashboardPage>
  )
}
