"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "@convex-dev/auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegHeart, FaUser } from "react-icons/fa";

export default function Navbar() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  return (
    <nav className="py-7 bg-sky-600">
      <div className="flex justify-around max-w-[1500px] items-center mx-auto px-5">
        <div className="flex flex-col md:flex-row  items-center gap-5">
          <div className="text-white flex items-center justify-around w-full md:w-auto">
            <Button className="md:hidden" onClick={() => signOut()}>
              Log Out
            </Button>
            <Link href={"/"} className="font-bold text-xl md:pr-10">
              Logo
            </Link>
            <div className="md:hidden">
              <Button
                className="bg-orange-500 hover:bg-orange-500/80 md:hidden"
                onClick={() => router.push("/favorites")}
              >
                <FaRegHeart />
              </Button>
            </div>
          </div>
          <div className="w-80 sm:w-96">
            <Input placeholder="Faça sua busca" className="bg-white" />
          </div>
        </div>
        <div className="hidden text-lg font-bold text-white md:flex md:items-center md:gap-8">
          <div>
            <Button onClick={() => signOut()}>Log Out</Button>
          </div>
          <div>
            <Button
              onClick={() => router.push("/favorites")}
              className="bg-orange-500 hover:bg-orange-500/80"
            >
              <FaRegHeart size={25} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
