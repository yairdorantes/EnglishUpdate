import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { helpHttp } from "../helpers/helpHttp";
import eyes from "../media/eye2.png";
import closeye from "../media/eyeclose.png";
import Loader from "./Loader";
import mySite from "./Domain";
let url = `${mySite}users/`;

const initialForm = {
  username: "",
  email: "",
  password: "",
};
const NewSignUp = () => {
  let { loginUser } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState(initialForm);

  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const changeEye = () => {
    setIsVisiblePass(!isVisiblePass);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const createData = async (data) => {
    // console.log(data.username);
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    setLoader(true);
    await helpHttp()
      .post(url, options)
      .then((res) => {
        console.log(res);
        setLoader(false);
      });

    // loginAfterSignUp(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      alert("Por favor llena todos los datos");
      return;
    } else {
      if (form.username.length > 14) {
        alert("Elige un nombre menor a 14 caracteres");
        return;
      }
    }
    setForm((form["password"] = form["password"]));
    createData(form);

    loginUser(e);
    handleReset();
  };
  const handleReset = () => setForm(initialForm);

  return (
    <div className="">
      <section className="bg-gray-50 dark:bg-gray-900">
        {loader ? (
          <div className="h-screen flex flex-col items-center justify-center">
            <Loader />
            <div className="alert alert-info shadow-lg w-56 mt-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Procesando Datos ...</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              Flowbite
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Crea una cuenta
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  action="#"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Usuario
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="nombre de usuario"
                      required=""
                      value={form.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="nombre@ejemplo.com"
                      required=""
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type={isVisiblePass ? "text" : "password"}
                      name="password"
                      id="password"
                      value={form.password}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={handleChange}
                    />
                    <img
                      className="w-7 absolute right-4 bottom-2 cursor-pointer"
                      onClick={changeEye}
                      src={!isVisiblePass ? closeye : eyes}
                      alt=""
                    />
                  </div>
                  <button
                    type="submit"
                    // onClick={handleSubmit}
                    className="w-full btn text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Registrar
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      className="font-medium text-accent hover:underline dark:text-primary-500"
                      to={"/login"}
                    >
                      Ingresar
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default NewSignUp;
