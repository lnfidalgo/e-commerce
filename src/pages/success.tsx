import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, [router]);

  return (
    <Card className="max-w-[600px] mx-auto">
      <CardHeader>
        <CardTitle className="text-emerald-400">
          Pagamento realizado com Sucesso!
        </CardTitle>
        <CardDescription>
          Você vai ser direcionado de volta para a página.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
