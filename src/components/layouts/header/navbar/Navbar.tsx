"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaUser } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="py-7 bg-sky-600">
      <div className="flex justify-around max-w-[1500px] items-center mx-auto px-5">
        <div className="flex flex-col sm:flex-row  items-center gap-5">
          <div className="text-white flex items-center justify-around w-full sm:w-auto">
            <Button
              className="bg-transparent hover:bg-transparent sm:hidden"
              onClick={() => router.push("/login")}
            >
              <FaUser />
            </Button>
            <Link href={'/'} className="font-bold text-xl sm:pr-10">Logo</Link>
            <div className="sm:hidden">
              <Button className="bg-transparent hover:bg-transparent sm:hidden">
                <FaShoppingCart />
              </Button>
            </div>
          </div>
          <div className="w-80 sm:w-96">
            <Input placeholder="Faça sua busca" className="bg-white" />
          </div>
        </div>
        <div className="hidden text-lg font-bold text-white sm:flex sm:items-center sm:gap-8">
          <div>
            <Link href={"/login"}>Login</Link>
          </div>
          <div>
            <FaShoppingCart />
          </div>
        </div>
      </div>
    </nav>
  );
}
