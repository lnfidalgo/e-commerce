import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000); // Redireciona para a página inicial após 5 segundos
  }, [router]);

  return (
    <div>
      <h1>Pagamento realizado com sucesso!</h1>
      <p>Você será redirecionado para a página inicial em breve...</p>
    </div>
  );
}
