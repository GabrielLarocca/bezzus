import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";
import Input from "../../components/Input";
import { Form } from "@unform/web";
import Logo from "../../img/logobezzusBig.png";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaAt, FaLock } from "react-icons/fa";
import RegisterModal from "./RegisterModal";
import "./styles.css";

export default function Login({ history }) {
  const formRef = useRef(null);
  const [modalregister, setmodalregister] = useState(false);

  async function handleLogin(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Email invalid")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      });
      await schema.validate(data, { abortEarly: false });
      const response = await api.post("/usuario/login", data);
      if (!response.data.success) {
        toast.error(response.data.err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        return;
      }
      login(response.data.token);
      toast.success("Login feito com sucesso!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      history.push("/shopping");
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors([]);
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <RegisterModal
        closeModal={() => setmodalregister(false)}
        modalVisible={modalregister}
      />
      <div className="login-container">
        <div className="row">
          <div className="col-12">
            <img src={Logo} alt="logo" className="w-100 mb-4 img-fluid" />
            <Form ref={formRef} onSubmit={handleLogin}>
              <div className="col-12 p-0">
                <FaAt size={30} className="iconInput" />
                <Input
                  type="email"
                  className="inputPadrao mb-2"
                  name="email"
                  placeholder="EMAIL"
                />
              </div>
              <div className="col-12 p-0">
                <FaLock size={30} className="iconInput" />
                <Input
                  type="password"
                  className="inputPadrao mb-2"
                  name="password"
                  placeholder="PASSWORD"
                />
              </div>

              <button type="submit" className="btn btn-black w-100">
                ENTER
              </button>
            </Form>

            <div className="col-12">
              <div className="row mt-2">
                <div className="col-6 p-0">
                  <Link to="" className="labelSmall mt-2">
                    REMEMBER ME
                  </Link>
                </div>
                <div className="col-6 p-0">
                  <Link to="/registrar-se" className="labelSmall">
                    <p className="text-right">
                      <i>FORGOT PASSWORD?</i>
                    </p>
                  </Link>
                </div>
                <div className="col-12 mt-3 text-center">
                  <button
                    className="pointer btn btn-signUp"
                    onClick={() => setmodalregister(true)}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
