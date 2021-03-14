import React, { useRef } from "react";
import { Modal } from "react-responsive-modal";
import Input from "../../components/Input";
import { Form } from "@unform/web";
import { toast } from "react-toastify";
import { login } from "../../services/auth";

import * as Yup from "yup";
import { FaUserAlt, FaLock, FaAt } from "react-icons/fa";
import api from "../../services/api";
import "./styles.css";

export default function RegisterModal({ modalVisible, closeModal, history }) {
  const formRef = useRef(null);

  async function handleRegister(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Email invalid")
          .required("Email is required"),
        nome: Yup.string().required("Name is required"),
        password: Yup.string().required("Password is required"),
      });
      await schema.validate(data, { abortEarly: false });
      if (data.password !== data.passwordConfirm) {
        toast.error("Ops,different passwords!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        return;
      }

      const response = await api.post("/usuario/", data);
      if (!response.data.success) {
        toast.error(response.data.err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        return;
      }
      login(response.data.token);
      toast.success("Register successful!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      closeModal(true);
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
    <Modal
      open={modalVisible}
      onClose={closeModal}
      styles={customStyles}
      center
    >
      <div className="register-container">
        <div className="row">
          <div className="col-12">
            <h3 className="text-center">REGISTER</h3>
            <Form ref={formRef} onSubmit={handleRegister}>
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
                <FaUserAlt size={30} className="iconInput" />
                <Input
                  type="text"
                  className="inputPadrao mb-2"
                  name="nome"
                  placeholder="NAME"
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

              <div className="col-12 p-0">
                <FaLock size={30} className="iconInput" />
                <Input
                  type="password"
                  className="inputPadrao mb-2"
                  name="passwordConfirm"
                  placeholder="CONFIRM PASSWORD"
                />
              </div>

              <button type="submit" className="btn btn-black w-100">
                SIGN IN
              </button>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

const customStyles = {
  modal: {
    backgroundColor: "#e5e5e5",
    borderRadius: "3%",
    width: 500,
  },
};
