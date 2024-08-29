import { Suspense } from "react";
import MainContent from "../layouts/content/MainContent";
import Header from "../layouts/header/Header";
import Loading from "../../app/loading";

export default function MainScreen() {
  return (
    <main className="h-full mx-auto">
      <Header />
      <MainContent />
    </main>
  );
}
