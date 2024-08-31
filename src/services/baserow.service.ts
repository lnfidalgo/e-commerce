import axios from "axios";
import api from "./baserowAPI.service";

interface formData {
  Email: string;
  Password: string;
}

const BASEROW_API_URL_POST = process.env.BASEROW_API_URL_POST;
const API_TOKEN = process.env.API_TOKEN;
const tableID = 346128;

export const getImages = async () => {
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

export const verifyLogin = async (_data: any) => {
  try {
    const response = await api.get(
      `https://api.baserow.io/api/database/rows/table/${tableID}/?user_field_names=true`
    );
    const data=response.data.results;
    console.log(data)
    const passwordExists = data.some(
      (item: any) => item.Password === _data.password
    );
    const emailExists = data.some((item: any) => item.Email === _data.email);
    console.log(passwordExists);
    console.log(emailExists);

    if (emailExists && passwordExists) {
      return { status: true, message: "Login certo!" };
    } else {
      return { status: false, message: "Email ou senha incorretos." };
    }
  } catch (e) {
    console.error("Erro ao buscar dados:", e);
    throw e;
  }
};

export const postDataToDB = async (data: formData) => {
  try {
    const response = await axios.post(BASEROW_API_URL_POST!, data, {
      headers: {
        Authorization: `Token ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("erro ao enviar para o baserow:", error);
    throw error;
  }
};
