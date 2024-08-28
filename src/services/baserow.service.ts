import api from "./baserowAPI.service";

export const getImages = async () => {
  const tableID = 346128;
  return await api
    .get(
      `https://api.baserow.io/api/database/rows/table/${tableID}/?user_field_names=true`
    )
    .then((response) => {
      return {
        data: response.data.results,
        status: response.status,
      };
    })
    .catch((e) => {
      console.error("Deu erro no get: ", e);
    });
};
