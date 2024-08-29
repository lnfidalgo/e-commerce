import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";

const components: { title: string; href: string }[] = [
  {
    title: "Processador",
    href: "/docs/primitives/alert-dialog",
  },
  {
    title: "Placa de vídeo",
    href: "/docs/primitives/hover-card",
  },
  {
    title: "Notebook",
    href: "/docs/primitives/progress",
  },
];

export default function DepartmentBar() {
  return (
    <div className="bg-orange-500 w-full">
      <NavigationMenu className="max-w-[1500px] mx-auto justify-start px-5">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 text-white font-bold hover:text-white">Departamentos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] bg-slate-200 ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                ></ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
}
