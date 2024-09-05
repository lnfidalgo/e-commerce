"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddToFavoritesButton from "../../common/AddFavoriteButton";

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
    <div className="max-w-[1600px] mx-auto bg-white">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-10 pt-8 h-full justify-items-center">
        {products.map((product: any) => {
          return (
            <div key={product.id} className="pt-7">
              <div className="flex gap-5 items-center flex-col w-60 justify-center">
                <div className="flex">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={150}
                    height={150}
                    priority
                  />
                  <AddToFavoritesButton productId={product.images[0]} />
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="h-20 overflow-y-hidden text-left font-semibold">
                    {product.description}
                  </h2>
                  <div>
                    <p className="text-2xl font-bold text-orange-500">
                      {product.rawPrice}
                    </p>
                    <p className="text-slate-500 text-sm">À vista no PIX</p>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    router.push(`/produto/${product.id}/${product.description}`)
                  }
                  className="w-full bg-orange-500 hover:bg-orange-500/90"
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
