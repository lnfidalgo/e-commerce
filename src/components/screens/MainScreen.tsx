import MainContent from "../layouts/content/MainContent";
import Header from "../layouts/header/Header";


export default function MainScreen() {
  return (
    <main className="h-full mx-auto">
      <Header/>
      <MainContent />
    </main>
  );
}
