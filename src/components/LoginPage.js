import "./styles/formStyles.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { helpHttp } from "../helpers/helpHttp";
import mySite from "./Domain";
import eyes from "../media/eye2.png";
import closeye from "../media/eyeclose.png";
let url = `${mySite}users/`;
const initialForm = {
  username: "",
  email: "",
  password: "",
};
const LoginPage = () => {
  let { loginUser, logoutUser, loginAfterSignUp } = useContext(AuthContext);
  const [eye, setEye] = useState(false);

  const navigate = useNavigate();

  // const [db, setDb] = useState([]);
  const [form, setForm] = useState(initialForm);

  const createData = (data) => {
    console.log(data.username);
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    helpHttp()
      .post(url, options)
      .then((res) => {
        console.log(res);
      });
    // loginAfterSignUp(data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
      // logoutUser();
      navigate("/menu");
    }
    setForm((form["password"] = form["password"]));
    createData(form);
    console.log(form["password"]);

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
  };

  const toggleEye = () => {
    eye ? setEye(false) : setEye(true);
  };

  return (
    <>
      <div className="login-form">
        <div className="login-container">
          <form className="form" onSubmit={loginUser}>
            <input
              onChange={handleChange}
              className="parrafo"
              name="username"
              placeholder="Nombre de usuario"
              type="text"
              value={form.username}
            />
            <input
              onChange={handleChange}
              className="parrafo"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
            />

            <input
              onChange={handleChange}
              className="parrafo"
              name="password"
              placeholder="Password"
              type={eye ? "text" : "password"}
              value={form.password}
            />
            {form.password !== "" && (
              <span className="eye eye-create">
                <img
                  className="eye-icon"
                  onClick={toggleEye}
                  src={eye ? eyes : closeye}
                  alt=""
                />
              </span>
            )}
            <div className="btn-register">
              <button onClick={handleSubmit} type="submit">
                Registrar
              </button>
              <Link
                style={{ color: "rgb(0, 218, 153)", textDecoration: "none" }}
                className="link-to-signup"
                to={"/login"}
              >
                <div>- Login -</div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
