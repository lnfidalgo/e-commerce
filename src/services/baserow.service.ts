import axios from "axios";
import api from "./baserowAPI.service";
import bcrypt from "bcryptjs";

interface formData {
  Email: string;
  Password: string;
}

const BASEROW_API_URL_POST = process.env.BASEROW_API_URL_POST;
const API_TOKEN = process.env.API_TOKEN;
const tableID = 346128;


export const verifyLogin = async (_data: any) => {
  try {

    const response = await api.get(
      `https://api.baserow.io/api/database/rows/table/${tableID}/?user_field_names=true`
    );
    console.log("Strripe:", process.env.STRIPE_SECRET_KEY);
    const data=response.data.results;

    const passwordExists=await data.some((item: any) =>
      console.log(item.Password, "data:", _data.password )
     // bcrypt.compare(item.Password, _data.password)
    );
    
    console.log(data)
    const emailExists= data.some((item: any) => item.Email);
    
    console.log('aqui:', emailExists)

    if (emailExists && passwordExists) {
      return { status: 200, message: "Login certo!" };
    } else {
      return { status: 403, message: "Email ou senha incorretos." };
    }
  } catch (e) {
    console.error("Erro ao buscar dados:", e);
    throw e;
  }
};

export const postDataToDB = async (_data: formData) => {
  try {
    const hashedPassword = await bcrypt.hash(_data.Password, 10);
    const response = await api.post(
      BASEROW_API_URL_POST!,
      { Email: _data.Email, Password: hashedPassword },
      {
        headers: {
          Authorization: `Token ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("erro ao enviar para o baserow:", error);
    throw error;
  }
};
