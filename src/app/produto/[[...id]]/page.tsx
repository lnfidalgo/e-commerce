"use client";

import { Button } from "@/components/ui/button";
import CheckoutButton from "@/src/components/common/CheckoutButton";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Produto({ params }: { params: { id: string } }) {
  const [products, setProducts] = useState([]);
  const { id } = useParams() ?? { id: "" };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products", { cache: "no-store" });
      const data = await response.json();
      const filterData=data.products.filter((item: any) => item.id === id[0]);
      console.log('dentro do effect:  ', filterData)
      setProducts(filterData);
    };

    fetchProducts();
  }, []);
  console.log("produtos:  ",products)
  return (
    <div className="max-w-[1600px] h-full mx-auto bg-white">
      {products.map((product: any) => {
        return (
          <div key={product.id} className="px-10 pt-8 h-full flex flex-col">
            <div>
              <h2 className="font-semibold">{product.description}</h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center h-[500px]">
              <div className="w-[40%] flex items-center justify-center">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={320}
                  height={320}
                  priority
                />
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
                      R${product.price}
                    </p>
                    <p className="text-foreground">À vista no PIX</p>
                    <CheckoutButton
                      product={{ name: product.name, price: product.price }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button className="lg:hidden w-full p-6 text-xl uppercase bg-orange-500 hover:bg-orange-500/90">
              Comprar
            </Button>
          </div>
        );
      })}
    </div>
  );
}
