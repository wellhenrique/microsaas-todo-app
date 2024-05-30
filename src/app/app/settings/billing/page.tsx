'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { createCheckoutSessionAction } from './actions'

export default function Page() {
  return (
    <form action={createCheckoutSessionAction}>
      <Card>
        <CardHeader>
          <CardTitle>Uso do Plano</CardTitle>
          <CardDescription>
            Você está atualmente no plano [current_plan]. Ciclo de faturamento
            atual: [current_billing_cycle].
          </CardDescription>
        </CardHeader>
        <CardContent className="border-t border-border pt-[22px] pb-[26px]">
          <div className="space-y-2">
            <header className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">1/5</span>
              <span className="text-muted-foreground text-sm">20%</span>
            </header>
            <main>
              <Progress value={20} />
            </main>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border pt-[26px] flex items-center justify-between">
          <span>Para um limite maior, atualize para PRO</span>
          <Button type="submit">Assine por R$9/ mês</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
