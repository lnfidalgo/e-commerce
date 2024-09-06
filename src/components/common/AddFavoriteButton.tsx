"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const AddToFavoritesButton = ({ productId }: any) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const addToFavorites = useMutation(api.mutations.favorites.addFavorite);

  const handleAddToFavorites = async () => {
    try {
      await addToFavorites({ productId });
      setIsFavorite(!isFavorite);
      toast({
        title: isFavorite
          ? "Produto removido dos favoritos!"
          : "Produto adicionado aos favoritos!",
        description: isFavorite
          ? "Você removeu este produto dos seus favoritos."
          : "Você adicionou este produto aos seus favoritos.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar/remover produto dos favoritos.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleAddToFavorites}
        className="bg-orange-500 hover:bg-orange-500/90"
      >
        <div className="transition-transform duration-300 ease-in-out">
          {isFavorite ? (
            <FaHeart className="text-white transform scale-110" />
          ) : (
            <FaRegHeart className="transform scale-100" />
          )}
        </div>
      </Button>
      <Toaster />
    </>
  );
};

export default AddToFavoritesButton;
