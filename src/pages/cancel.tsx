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
    <Card className="max-w-[600px] mx-auto">
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
  );
}
