"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import CheckoutButton from "@/src/components/common/CheckoutButton";
import DepartmentBar from "@/src/components/layouts/header/departmentBar/DepartmentBar";
import Navbar from "@/src/components/layouts/header/navbar/Navbar";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";

interface favoritesConvexProps {
  productId: string;
  _id: string;
}

interface productsStripePros {
  name: string;
  price: string;
  description: string;
  rawPrice: string;
}

const FavoritesPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products", { cache: "no-store" });

      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);
  const favorites = useQuery(api.mutations.favorites.getFavorites);

  const removeFromFavorites = useMutation(
    api.mutations.favorites.removeFavorite
  );

  const handleRemove = async (productId: any) => {
    try {
      await removeFromFavorites({ productId });
      console.log("Produto removido dos favoritos com sucesso!");
    } catch (error) {
      console.error("Erro ao remover o produto dos favoritos:", error);
      toast({})
    }
  };

  if (!favorites) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Card className="max-w-[600px]">
          <CardHeader>
            <CardTitle className="text-blue-500">CARREGANDO...</CardTitle>
            <CardDescription>
              Estamos buscando os seus favoritos, aguarde...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <DepartmentBar />
      <div className="max-w-[1600px] mx-auto bg-white p-10">
        <div className=" flex flex-col h-full">
          <div className="flex items-center gap-4">
            <p className="text-orange-500">
              <FaRegHeart size={25} />
            </p>
            <h1 className="text-3xl font-bold text-muted-foreground">
              Favoritos
            </h1>
          </div>
          {favorites.length === 0 ? (
            <p className="text-muted-foreground">Sem favoritos no momento</p>
          ) : (
            <ul>
              {favorites.map((favorite: favoritesConvexProps) => {
                const teste = products.filter(
                  (item: any) => item.images[0] === favorite.productId
                );

                const itemsMap = teste.map((product: productsStripePros) => {
                  return {
                    nome: product.name,
                    price: product.price,
                    description: product.description,
                    rawPrice: product.rawPrice,
                  };
                });

                if (itemsMap.length === 0) {
                  return;
                }

                return (
                  <div
                    key={favorite._id}
                    className="flex flex-col gap-5 md:flex-row items-center justify-around py-5"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                      <Image
                        src={favorite.productId}
                        alt="teste"
                        height={160}
                        width={160}
                        priority
                      />

                      <div className="flex flex-col text-muted-foreground w-[150px] lg:w-[450px] items-start">
                        <div>
                          <p className="text-xl text-black">
                            {itemsMap[0].nome}
                          </p>
                          <p>{itemsMap[0].description}</p>
                        </div>
                      </div>
                    </div>
                    <p className="bg-slate-400 md:w-[1px] md:h-28 w-40 h-[1px]"></p>
                    <div className="w-[130px]">
                      <p className="text-xl font-bold text-orange-500">
                        {itemsMap[0].rawPrice}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        À vista no PIX
                      </p>
                    </div>
                    <div className="flex flex-col gap-5">
                      <Button onClick={() => handleRemove(favorite._id)}>
                        Remover favorito
                      </Button>
                      <CheckoutButton
                        product={{
                          name: itemsMap[0].nome,
                          price: itemsMap[0].price,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </ul>
          )}
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
