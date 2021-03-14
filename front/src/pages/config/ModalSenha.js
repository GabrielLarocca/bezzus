import React, { useRef } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Input from "../../components/Input";
import api from "../../services/api";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { toast } from "react-toastify";

export default function ModalSenha({ modalVisible, closeModal, fetchData }) {
  const formEdit = useRef(null);

  const AlterarDados = async (data) => {
    formEdit.current.setErrors({});
    try {
      let schema = Yup.object().shape({
        password: Yup.string().required("Senha é obrigatório"),
        newpassword: Yup.string().required("Nova senha é obrigatório"),
        confirmpassword: Yup.string().required(
          "Confirmação da senha é obrigatório"
        ),
      });
      await schema.validate(data, { abortEarly: false });

      if (data.newpassword !== data.confirmpassword) {
        toast.error("Nova senha e sua confirmação não correspondem", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        return;
      }

      const response = await api.post("v1/usuario/atualizaSenha", {
        password: data.password,
        newpassword: data.newpassword,
      });

      if (response.data.success) {
        toast.success("Senha alterada com sucesso", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        closeModal();
        fetchData();
      } else {
        toast.error(response.data.err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formEdit.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <Modal
      open={modalVisible}
      onClose={closeModal}
      styles={customStyles}
      center
    >
      <Form ref={formEdit} onSubmit={AlterarDados}>
        <div className="mr-3 mb-3">
          <h3 className="colorBackground">Mudar Senha</h3>
        </div>
        <div className="container-fluid">
          <div className="form-group mt-5">
            <label className="label">Senha antiga</label>
            <Input
              type="password"
              name="password"
              className="inputStyle form-control"
              placeholder="Digite sua senha antiga"
            />
          </div>
          <div className="form-group mt-5">
            <label className="label">Senha nova</label>
            <Input
              type="password"
              name="newpassword"
              className="inputStyle form-control"
              placeholder="Digite sua senha nova"
            />
          </div>
          <div className="form-group mt-5">
            <label className="label">Confirme sua senha nova</label>
            <Input
              type="password"
              name="confirmpassword"
              className="inputStyle form-control"
              placeholder="Confirme sua senha nova"
            />
          </div>
        </div>
        <hr />
        <button type="button" onClick={closeModal} className="btn btn-danger ">
          Cancelar
        </button>
        <button type="submit" className="btn btn-success float-right">
          Alterar
        </button>
      </Form>
    </Modal>
  );
}

const customStyles = {
  modal: {
    width: 800,
    maxWidth: 900,
  },
};
