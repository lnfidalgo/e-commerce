'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CancelPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">

    <Card className="max-w-[600px]">
      <CardHeader>
        <CardTitle className="text-red-400">Pagamento Cancelado!</CardTitle>
        <CardDescription>
          Você pode tentar novamente ou voltar para a tela inicial.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => (window.location.href = "/")}>
          Voltar para Início
        </Button>
      </CardContent>
    </Card>
    </div>
  );
}
