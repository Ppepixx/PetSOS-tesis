import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


import Header from "../components/header";

const RegisterPage = () => {

    const {register, handleSubmit, formState:{errors},}= useForm();
    const {signup, isAuthenticated, errors:registerErrors}= useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [hasAttemptedRegister, setHasAttemptedRegister] = useState(false);
    const navigate = useNavigate()

    const onSubmit = handleSubmit((data) => {
        signup(data);
    });

    useEffect(() => {
        if (isAuthenticated) {
            toast.success("Cuenta creada exitosamente", {
                position: "top-right", // Cambia la posición
                closeOnClick: true,
                autoClose: 3000,
                pauseOnHover: true,
                hideProgressBar: true,
                draggable: true,
                theme: "colored",
            });
            setTimeout(() => navigate("/"), 2000);
        }else if(hasAttemptedRegister && registerErrors.length > 0){
            toast.error("Hubo un error al crear la cuenta.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"

            });
        }
    }, [isAuthenticated, registerErrors, hasAttemptedRegister, navigate]);

    return (
        <div className="min-h-screen flex flex-col bg-orange-50">
            <Header/>
            <div className="flex flex-1 items-center justify-center">

                <ToastContainer
                    position="top-right"
                    style={{ marginTop: "4rem" }} // Ajusta la distancia
                    closeOnClick
                    autoClose={3000}
                    hideProgressBar
                    pauseOnHover
                    draggable
                    theme="colored"
                />
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
                    <div className="text-center mb-6">
                    <img
                        src="src/img/PETSOS.png" 
                        alt="Logo"
                        className="mx-auto w-35 h-35 mb-2"
                    />
                    <h1 className="text-2xl font-bold text-orange-600">
                        Crear Cuenta 🐾
                    </h1>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            {registerErrors.map((error, i) => (
                                    <div className="text-red-600 text-center" key={i}>
                                        {error}
                                    </div>
                            ))}
                            
                            <label className="block text-sm font-medium text-gray-700">
                            Usuario
                            </label>
                            <input
                            type="text"
                            {...register("username", { required: true })}
                            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Ingresa un nombre de usuario"
                            />
                            {errors.username && (<p className="text-sm text-red-600 mt-1">El Usuario es rquerido </p>)}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Correo
                            </label>
                            <input
                            type="email"
                            {...register("email", { required: true })}
                            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="correo@ejemplo.com"
                            />
                            {errors.email && (<p className="text-sm text-red-600 mt-1">El correo es requerido</p>)}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Direccion
                            </label>
                            <input 
                            type="text"
                            {...register("direccion", {required:true})} 
                            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300" 
                            placeholder="Ingresa Calle/Comuna/Provincia/Region"
                            />
                            {errors.direccion &&(<p className="text-sm text-red-600 mt-1">La direccion es requerida</p>)}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Teléfono
                            </label>
                            <input 
                            type="text" 
                            {...register("telefono", {required:true})}
                            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Ingresa tu número de teléfono"
                            />
                            {errors.telefono &&(<p className="text-sm text-red-600 mt-1">El número de teléfono es requerido</p>)}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Fecha de nacimiento
                            </label>
                            <input 
                            type="date" 
                            {...register("fechadnacimiento", {required:true})}
                            className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                            />
                            {errors.fechadnacimiento &&(<p className="text-sm text-red-600 mt-1">La fecha de nacimiento es requerida</p>)}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("contra", { required: true })}
                                    className="mt-1 w-full border rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    placeholder="********"
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-2 text-sm text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.03-10-7
                                                0-1.186.548-2.284 1.5-3.166m3.364-2.192A9.953 9.953 0 0112 5c5.523 0 10 4.03 10 7
                                                0 1.406-.676 2.713-1.825 3.825M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"/>
                                        </svg>

                                    ): (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7
                                                -1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                                {errors.contra && (<p className="text-sm text-red-600 mt-1">La contraseña es requerida</p>)}
                            </div>
                        </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
                    >
                        Registrarse
                    </button>
                    </form>
                    <div className="text-sm text-center mt-4 text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <a href="/login" className="text-orange-600 font-semibold hover:underline">
                            Regístrate
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;