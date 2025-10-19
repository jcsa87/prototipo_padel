// src/app/register/page.tsx
'use client';

import { useState, FormEvent, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase/supabaseClient'; // Asegúrate de que la ruta sea correcta

const RegisterPage: FC = () => {
  // Estados del formulario
  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // <-- NUEVO ESTADO

  // Estados de UI
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // --- VERIFICACIÓN DE CONTRASEÑA ---
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, intentalo de nuevo.');
      return; // Detiene la ejecución si no coinciden
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert(`Error al registrar: ${error.message}`);
    } else {
      setIsSubmitted(true);
    }

    setIsLoading(false);
  };

  // Vista de confirmación después de enviar el formulario
  if (isSubmitted) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#001a33] to-[#002b5b] text-white px-6">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#0b2545] border border-[#1b4e89] rounded-3xl p-10 w-full max-w-md shadow-2xl text-center"
        >
            <h2 className="text-3xl font-bold mb-4">¡Revisá tu correo! 📬</h2>
            <p className="text-neutral-300">
                Te enviamos un enlace de verificación. Por favor, hacé clic para activar tu cuenta y poder iniciar sesión.
            </p>
        </motion.div>
      </section>
    );
  }

  // Vista principal del formulario de registro
  return (
    // --- ESPACIO SUPERIOR AÑADIDO AQUÍ ---
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#001a33] to-[#002b5b] text-white px-6 pt-32 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#0b2545] border border-[#1b4e89] rounded-3xl p-10 w-full max-w-md shadow-2xl text-center"
      >
        <Image
          src="/sponsors/versori/VERSORI_TRANSPARENTE.PNG" // Asegúrate que esta ruta sea correcta
          alt="Versori Logo"
          width={90}
          height={90}
          className="mx-auto mb-6 opacity-90"
        />
        <h1 className="text-3xl font-bold mb-2">Crear una cuenta</h1>
        <p className="text-neutral-400 text-sm mb-8">
          Completá tus datos para unirte a la comunidad.
        </p>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4 text-left">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-300 mb-1">Nombre</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Juan" className="w-full p-3 rounded-xl bg-[#112d57] border border-blue-900/40 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-300 mb-1">Apellido</label>
              <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required placeholder="Pérez" className="w-full p-3 rounded-xl bg-[#112d57] border border-blue-900/40 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
            </div>
          </div>

          <div>
             <label className="block text-sm text-gray-300 mb-1">Teléfono</label>
             <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="11 2345 6789" className="w-full p-3 rounded-xl bg-[#112d57] border border-blue-900/40 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="ejemplo@gmail.com" className="w-full p-3 rounded-xl bg-[#112d57] border border-blue-900/40 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full p-3 rounded-xl bg-[#112d57] border border-blue-900/40 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
          </div>
          
          {/* --- CAMPO DE CONFIRMAR CONTRASEÑA --- */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Confirmar Contraseña</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="••••••••" className="w-full p-3 rounded-xl bg-[#112d57] border border-blue-900/40 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded-xl font-semibold text-white disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6">
          ¿Ya tenés una cuenta?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default RegisterPage;