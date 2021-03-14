import React, { useRef } from "react";
import api from "../../service/api";
import { login } from "../../service/auth";
import { NotificationManager } from "react-notifications";
import Input from "../../components/Input";
import * as Yup from "yup";
import { Form } from "@unform/web";
import logo from "../../assets/img/logobezzusBig.png";

export default function Home({ history }) {
  const formRef = useRef(null);

  const handleLogin = async (data) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Email inválido")
          .required("Email é obrigatório"),
        password: Yup.string().required("Senha é obrigatório"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const response = await api.post("/usuario/login", {
        email: data.email,
        password: data.password,
      });
      if (!response.data.success) {
        NotificationManager.error(response.data.err, "Error!");
        return;
      }
      login(response.data.token);
      NotificationManager.success(
        "Você está autenticado para navegar",
        "Sucesso!",
        2000
      );
      history.push("/produtos");
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
  };

  return (
    <div className="login">
      <img src={logo} width="200" alt="logo" />
      <h5 className="mt-4 mb-4">Área Adminstrativa </h5>
      <Form ref={formRef} onSubmit={handleLogin}>
        <div className="form-group">
          <Input
            label="Email"
            type="email"
            name="email"
            className="form-control"
            placeholder="Digite seu email"
          />
        </div>
        <div className="form-group">
          <Input
            label="Senha"
            type="password"
            name="password"
            className="form-control"
            placeholder="Digite sua Senha"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </Form>
    </div>
  );
}
