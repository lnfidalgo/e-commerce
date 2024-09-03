"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainContent() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products", { cache: "no-store" });

      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);
  return (
    <div className="max-w-[1600px] h-full mx-auto bg-white">
      <div className="flex gap-5 overflow-x-hidden px-10 pt-8">
        {products.map((product: any) => {
          return (
            <div key={product.id}>
              <div className="flex gap-5 items-center flex-col w-60 justify-center">
                <div>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={150}
                    height={150}
                    priority
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="h-20 overflow-y-hidden text-left font-semibold">
                    {product.description}
                  </h2>
                  <div>
                    <p className="text-2xl font-bold text-orange-500">
                      R${product.price}
                    </p>
                    <p className="text-slate-500 text-sm">À vista no PIX</p>
                  </div>
                </div>
                <Button
                  onClick={() => router.push(`/produto/${product.id}`)}
                  className="w-full"
                >
                  Comprar
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
