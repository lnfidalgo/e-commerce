"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const AddToFavoritesButton = ({ productId }: any) => {
  const addToFavorites = useMutation(api.mutations.favorites.addFavorite);

  const handleAddToFavorites = async () => {
    try {
      console.log("ADD FAVORITE:", productId)
      await addToFavorites({ productId });
      alert("Produto adicionado aos favoritos!");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar produto aos favoritos.");
    }
  };

  return (
    <button onClick={handleAddToFavorites}>Adicionar aos Favoritos</button>
  );
};

export default AddToFavoritesButton;
