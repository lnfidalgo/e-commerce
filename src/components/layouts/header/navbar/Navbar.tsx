"use client";

import { Input } from "@/components/ui/input";
import { getImages } from "@/src/services/baserow.service";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";


export default function Navbar() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages().then((response: any) => {
      setImages(response.data);
      console.log(response);
    });
  }, []);
  return (
    <nav className="py-7 bg-sky-600">
      <div className="flex justify-around max-w-[1500px] items-center mx-auto px-5">
        <div className="flex items-center gap-5">
          <div>Logo</div>
          <div className="w-96">
            <Input placeholder="Faça sua busca" className="bg-white" />
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div>
            <h2>Login</h2>
          </div>
          <div>
            <FaShoppingCart />
          </div>
        </div>
      </div>
    </nav>
  );
}
