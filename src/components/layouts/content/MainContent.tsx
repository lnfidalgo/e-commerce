"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddToFavoritesButton from "../../common/AddFavoriteButton";
import { api } from "@/convex/_generated/api";
import { getFavorites } from "@/convex/mutations/favorites";
import { useQuery } from "convex/react";
import { FavoritesPage } from "../../common/FavoritesPage";

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
                      {product.price}
                    </p>
                    <p className="text-slate-500 text-sm">À vista no PIX</p>
                  </div>
                </div>
                <AddToFavoritesButton productId={product.images[0]} />
              </div>
            </div>
          );
        })}
      </div>
      <FavoritesPage />
    </div>
  );
}
