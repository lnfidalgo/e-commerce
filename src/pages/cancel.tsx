export default function CancelPage() {
  return (
    <div>
      <h1>Pagamento cancelado!</h1>
      <p>Você pode tentar novamente ou voltar à página inicial.</p>
      <button onClick={() => (window.location.href = "/")}>
        Voltar à Página Inicial
      </button>
    </div>
  );
}
