import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getFavorites } from "@/convex/mutations/favorites";

export const FavoritesPage = () => {
  const favorites = useQuery(api.mutations.favorites.getFavorites);
  console.log(favorites);
  const removeFromFavorites = useMutation(
    api.mutations.favorites.removeFavorite
  );
  
  const handleRemove = async (productId: any) => {
    try {
      await removeFromFavorites({ productId });
      console.log("Produto removido dos favoritos com sucesso!");
    } catch (error) {
      console.error("Erro ao remover o produto dos favoritos:", error);
    }
  };

  if (!favorites) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>My Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <ul>
          {favorites.map((favorite) => (
            <div key={favorite._id}>
              <Image
                src={favorite.productId}
                alt="teste"
                width={100}
                height={100}
              />
              <Button onClick={() => handleRemove(favorite._id)}>
                Remover
              </Button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
