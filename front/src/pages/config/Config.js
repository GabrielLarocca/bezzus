import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header/Header";
import MenuConfig from "../../components/menuConfig/MenuConfig";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Form } from "@unform/web";
import Input from "../../components/Input";
import api from "../../services/api";
import "./style.css";
import ModalSenha from "./ModalSenha";

export default function Config({ history }) {
  const formRef = useRef(null);
  const [, setcliente] = useState([]);
  const [modalSenha, setmodalSenha] = useState(false);

  const fetchData = async () => {
    const response = await api.get("/v1/usuario/me");
    setcliente(response.data);
    formRef.current.setData(response.data);
  };

  const AlterarDados = async (data) => {
    formRef.current.setErrors({});
    try {
      let schema = Yup.object().shape({
        email: Yup.string()
          .email("Email inválido")
          .required("Email é obrigatório"),
        nome: Yup.string().required("Nome é obrigatório"),
      });
      await schema.validate(data, { abortEarly: false });
      const response = await api.put("v1/usuario", data);

      if (response.data.success) {
        window.scrollTo(0, 0);
        toast.success("Sua conta foi alterada com sucesso", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.error(response.data.err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    } catch (err) {
      console.log("err", err);
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="config">
      <ModalSenha
        closeModal={() => setmodalSenha(false)}
        modalVisible={modalSenha}
        history={history}
        fetchData={fetchData}
      />
      <Header />
      <div className="container-fluid">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-3">
              <div className="mt-3">
                <MenuConfig
                  label="settings"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscin."
                />
                <MenuConfig
                  label="requests"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscin."
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-8 mt-3 carded">
              <div className="row centerForm">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <h5 className="mt-4">
                    <b>SETTINGS</b>
                  </h5>
                  <Form ref={formRef} onSubmit={AlterarDados}>
                    <div className="form-group mt-5">
                      <Input
                        type="text"
                        name="nome"
                        label="Nome"
                        className="inputStyle form-control"
                        placeholder="Digite seu nome completo"
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        type="email"
                        name="email"
                        label="Email"
                        className="form-control inputStyle"
                        placeholder="Deixe seu email para contato"
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn btnPadrao"
                          onClick={() => setmodalSenha(true)}
                        >
                          Alterar senha
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btnPadrao float-right mt-3 mb-1"
                    >
                      Salvar informações
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
