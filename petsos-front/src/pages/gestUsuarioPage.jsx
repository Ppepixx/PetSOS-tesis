import { useEffect, useState } from "react";
import Header from "../components/header.jsx";
import { obtenerUsuarios, eliminarUsuario, actualizarUsuario } from "../api/usuario.js";

const GestUsuarioPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(null)
    const [formData, setFormData] = useState({})

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const res = await obtenerUsuarios();
                console.log("Respuesta del servidor:", res);
                setUsuarios(res);
            } catch (error) {
                console.error("Error al cargar usuarios", error);
            }
        };
        cargarUsuarios();
        }, []);
    
    const handleEliminarUsuario = async (id) => {
        try {
            const res = await eliminarUsuario(id);
            console.log("Usuario eliminado:", res);
            setUsuarios(usuarios.filter(user => user._id !== id));
        } catch (error) {
            console.error("Error al eliminar usuario", error); 
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleEditar = (usuario) => {
        setModoEdicion(usuario._id);
        setFormData({
            username: usuario.username,
            email: usuario.email,
            telefono: usuario.telefono,
            roles: usuario.roles?.[0] || ""
        });
    };

    const handleGuardar = (id) => {
        const updatedData = {
            username: formData.username,    
            email: formData.email,
            telefono: formData.telefono,
            roles: formData.roles ? [formData.roles] : []
        };
        actualizarUsuario(id, updatedData)
            .then((res) => {
                console.log("Usuario actualizado:", res);   
                setUsuarios((prev) =>
                    prev.map((u) =>
                        u._id === id ? { ...u, ...updatedData } : u
                    )
                );
                setModoEdicion(null);
            })
            .catch((error) => {
                console.error("Error al actualizar usuario", error);
            });
    };
    
    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded">
                        <thead className="bg-pink-100">
                            <tr>
                                <th className="py-2 px-4 border-b">Nombre de Usuario</th>
                                <th className="py-2 px-4 border-b">Correo</th>
                                <th className="py-2 px-4 border-b">Teléfono</th>
                                <th className="py-2 px-4 border-b">Rol</th>
                                <th className="py-2 px-4 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((user) => (
                                <tr key={user._id} className="text-center">
                                    <td className="py-2 px-4 border-b">
                                        {modoEdicion === user._id ? (
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                className="border rounded px-2 py-1 text-sm"
                                            />
                                        ) : (
                                            user.username
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {modoEdicion === user._id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="border rounded px-2 py-1 text-sm"
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {modoEdicion === user._id ? (
                                            <input
                                                type="text"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                                className="border rounded px-2 py-1 text-sm"
                                            />
                                        ) : (
                                            user.telefono
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {modoEdicion === user._id ? (
                                            <input
                                                type="text"
                                                name="roles"
                                                value={formData.roles}
                                                onChange={handleChange}
                                                className="border rounded px-2 py-1 text-sm"
                                            />
                                        ) : (
                                            user.roles?.[0] || "usuario"
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {modoEdicion === user._id ? (
                                            <button
                                                onClick={() => handleGuardar(user._id)}
                                                className="text-green-600 hover:underline mr-2"
                                            >
                                                Guardar
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEditar(user)}
                                                className="text-blue-500 hover:underline mr-2"
                                            >
                                                Editar
                                            </button>
                                        )}
                                        <button className="text-red-500 hover:underline" onClick={
                                            () => handleEliminarUsuario(user._id)
                                        }>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GestUsuarioPage;