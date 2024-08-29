"use client";

import { getImages } from "@/src/services/baserow.service";
import { useEffect, useState } from "react";
import Image from "next/image";
import { produto } from "./componentObjects";
import { Button } from "@/components/ui/button";

export default function MainContent() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages().then((response: any) => {
      setImages(response.data);
    });
  }, []);
  return (
    <div className="max-w-[1600px] h-full mx-auto bg-white">
      <div className="flex gap-5 overflow-x-hidden px-10 pt-8">
        {produto.produtos.map((item, index) => {
          const image = images.find((img: any) => img.id === item.imageID);
          return (
            <div key={index}>
              <div className="flex gap-5 items-center flex-col w-60 justify-center">
                <div>
                  {image && (
                    <Image
                      src={image.ImgCards[0].url}
                      key={index}
                      alt="teste"
                      width={150}
                      height={150}
                      priority
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="h-20 overflow-y-hidden text-left font-semibold">
                    {item.description}
                  </h2>
                  <div>
                    <p className="text-2xl font-bold text-orange-500">
                      {item.price}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {item.priceDescription}
                    </p>
                  </div>
                </div>
                <Button className="w-full">{item.buttonText}</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

