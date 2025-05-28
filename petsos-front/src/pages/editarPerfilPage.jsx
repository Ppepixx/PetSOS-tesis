import { useState, useEffect } from "react";
import axios from "axios";

const EditarPerfil = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    direccion: "",
    telefono: "",
    fechadnacimiento: "",
    contra: "",
  });

  useEffect(() => {
    // cargar datos actuales del usuario si tienes un endpoint para eso
    // axios.get("/api/users/me").then(res => setFormData({...formData, ...res.data}));
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // o donde almacenes el JWT
      const res = await axios.put("/api/users/update-profile", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar perfil");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Nombre de usuario" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Correo" />
      <input name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" />
      <input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" />
      <input name="fechadnacimiento" type="date" value={formData.fechadnacimiento} onChange={handleChange} />
      <input name="contra" type="password" value={formData.contra} onChange={handleChange} placeholder="Nueva contraseña" />
      <button type="submit">Actualizar Perfil</button>
    </form>
  );
};

export default EditarPerfil;