"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { FaRegHeart } from "react-icons/fa";

const AddToFavoritesButton = ({ productId }: any) => {
  const addToFavorites = useMutation(api.mutations.favorites.addFavorite);

  const handleAddToFavorites = async () => {
    try {
      console.log("ADD FAVORITE:", productId);
      await addToFavorites({ productId });
      alert("Produto adicionado aos favoritos!");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar produto aos favoritos.");
    }
  };

  return (
    <Button onClick={handleAddToFavorites} className="bg-orange-500 hover:bg-orange-500/90">
      <FaRegHeart />
    </Button>
  );
};

export default AddToFavoritesButton;
