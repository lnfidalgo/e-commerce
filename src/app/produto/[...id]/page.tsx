"use client";

import { Button } from "@/components/ui/button";
import { produto } from "@/src/components/layouts/content/componentObjects";
import { getImages, verifyLogin } from "@/src/services/baserow.service";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Produto({
  params,
}: {
  params: { slug: string[]; id: string };
  }) {
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { id }= useParams();
  
  useEffect(() => {
    getImages().then((response: any) => {
      setImages(response.data);
    });
  }, []);

  const image: any = images.find((img: any) => String(img.id) === params.id[0]);
  const produtoEspecifico = produto.produtos.find(
    (produtoItem) => produtoItem.id === Number(id[0])
  );

  return (
    <div className="max-w-[1600px] h-full mx-auto bg-white">
      <div className="px-10 pt-8 h-full flex flex-col">
        <div>
          <h2 className="font-semibold">{produtoEspecifico?.description}</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center h-[500px]">
          <div className="w-[40%] flex items-center justify-center">
            {image && (
              <Image
                src={image.ImgCards[0].url}
                alt="teste"
                width={320}
                height={320}
                priority
              />
            )}
          </div>
          <div className="w-[60%]">
            <div>
              <div className="h-16 flex items-center justify-center">
                <p className="text-xl sm:text-3xl font-semibold">
                  Alguma promoção
                </p>
              </div>
              <div className="text-xl sm:text-2xl font-bold flex text-center
              justify-between sm:justify-around">
                <div>
                  <p>Desconto:</p>
                  <p>{produtoEspecifico?.desconto}</p>
                </div>
                <div>
                  <p>Restam:</p>
                  <p>{produtoEspecifico?.quantidade}</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex flex-col gap-5">
                <p className="text-4xl sm:text-5xl font-bold text-orange-500">
                  {produtoEspecifico?.price}
                </p>
                <p className="text-foreground">
                  {produtoEspecifico?.priceDescription}
                </p>
                <Button className="hidden lg:flex max-w-[560px] p-6 text-xl uppercase bg-orange-500 hover:bg-orange-500/90">
                  {produtoEspecifico?.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Button className="lg:hidden w-full p-6 text-xl uppercase bg-orange-500 hover:bg-orange-500/90">
          {produtoEspecifico?.buttonText}
        </Button>
      </div>
    </div>
  );
}
