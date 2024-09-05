"use client";

import AddToFavoritesButton from "@/src/components/common/AddFavoriteButton";
import CheckoutButton from "@/src/components/common/CheckoutButton";
import DepartmentBar from "@/src/components/layouts/header/departmentBar/DepartmentBar";
import Navbar from "@/src/components/layouts/header/navbar/Navbar";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Produto({ params }: { params: { id: string } }) {
  const [products, setProducts] = useState([]);
  const { id } = useParams() ?? { id: "" };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products", { cache: "no-store" });
      const data = await response.json();
      const filterData = data.products.filter((item: any) => item.id === id[0]);
      setProducts(filterData);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <DepartmentBar />

      <div className="max-w-[1600px] h-full mx-auto bg-white">
        {products.map((product: any) => {
          return (
            <div key={product.id} className="px-10 pt-8 h-full flex flex-col">
              <div>
                <h2 className="font-semibold">{product.description}</h2>
              </div>

              <div className="flex flex-col sm:flex-row items-center h-[500px]">
                <div className="w-[40%] flex">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={320}
                    height={320}
                    priority
                  />

                  <AddToFavoritesButton productId={product.images[0]} />
                </div>
                <div className="w-[60%]">
                  <div>
                    <div className="h-16 flex items-center justify-center">
                      <p className="text-xl sm:text-3xl font-semibold">
                        Alguma promoção
                      </p>
                    </div>
                    <div
                      className="text-xl sm:text-2xl font-bold flex text-center
              justify-between sm:justify-around"
                    >
                      <div>
                        <p>Desconto:</p>
                        <p>{/*desconto*/}</p>
                      </div>
                      <div>
                        <p>Restam:</p>
                        <p>{/*quantidade*/}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="flex flex-col gap-5">
                      <p className="text-4xl sm:text-5xl font-bold text-orange-500">
                        {product.rawPrice}
                      </p>
                      <p className="text-foreground">À vista no PIX</p>
                      <CheckoutButton
                        product={{ name: product.name, price: product.price }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
