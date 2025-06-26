// api/comentarios.js
import axios from "./axios";

export const comentarPublicacion = (idPubli, texto) => {
  return axios.post(`/petsos/publis/${idPubli}/comentarios`, { texto });
};
