import instance from "./axios.js"; // Importa la configuración de Axios

const ListPubli = async () => {
    try {
        const response = await instance.get("/petsos/publis");
        return response.data.publis; 
    } catch (error) {
        console.error("No se pudieron obtener los productos:", error);
        return [];
    }
};

export default ListPubli;