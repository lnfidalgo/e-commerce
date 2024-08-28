import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImages } from "@/src/services/baserow.service";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SignInCard() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages().then((response: any) => {
      setImages(response.data);
    });
  }, []);

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 py-0">
        <CardTitle>Faça login para continuar</CardTitle>
      </CardHeader>
      <CardDescription>Use seu email ou outro serviço</CardDescription>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          {images?.map((url: any, index: number) => (
            <Image
              src={url.Img[0].url}
              key={index}
              alt="teste"
              width={200}
              height={200}
              priority
            />
          ))}
        </form>
      </CardContent>
      <Button>Clica</Button>
    </Card>
  );
}
