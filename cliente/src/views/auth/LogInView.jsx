import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LogInView() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await auth.logIn(email, password);
      navigate("/");
    } catch (error) {
      toast.error("Credenciales incorrectas");
      console.error(error);
    }
  };

  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border shadow rounded w-full max-w-xs font-semibold text-gray-800 p-2"
        >
          <h2 className="text-3xl mb-3">Inicia sesion</h2>
          <article>
            <label className="text-sm">Correo</label>
            <input
              {...register("email")}
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
          <article>
            <label className="text-sm">Contraseña</label>
            <input
              {...register("password")}
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
          <button className="w-full bg-gray-800 text-gray-200 rounded py-2 mt-3 hover:bg-gray-900 transition duration-300">
            Iniciar sesion
          </button>
        </form>
      </section>
    </>
  );
}
export default LogInView;
