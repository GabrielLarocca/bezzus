import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Input from "../../components/Input";
import api from "../../service/api";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { toast } from "react-toastify";
import Avatar from "react-avatar";
import Dropzone from "react-dropzone";

export default function ModalProduto({
  modalVisible,
  closeModal,
  fetchData,
  produto,
}) {
  const formEdit = useRef(null);
  const [produtoFoto, setprodutoFoto] = useState("");

  const addProduto = async (data) => {
    formEdit.current.setErrors({});
    try {
      let schema = Yup.object().shape({
        marca: Yup.string().required("marca é obrigatório"),
        titulo: Yup.string().required("titulo é obrigatório"),
        descricao: Yup.string().required("descricao é obrigatório"),
        estoque: Yup.string().required("estoque é obrigatório"),
        color: Yup.string().required("cor é obrigatório"),
        preco: Yup.string().required("preco é obrigatório"),
      });
      await schema.validate(data, { abortEarly: false });

      if (produto) {
        const responsePUT = await api.put("v1/produtos/", {
          _id: produto._id,
          marca: data.marca,
          titulo: data.titulo,
          descricao: data.descricao,
          estoque: data.estoque,
          color: data.color,
          preco: data.preco,
          produtoFoto,
        });
        if (responsePUT.data.success) {
          toast.success("Produto salvo com sucesso", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          closeModal();
          fetchData();
        } else {
          toast.error(responsePUT.data.err, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      } else {
        const response = await api.post("v1/produtos/", {
          marca: data.marca,
          titulo: data.titulo,
          descricao: data.descricao,
          estoque: data.estoque,
          color: data.color,
          preco: data.preco,
          produtoFoto,
        });

        if (response.data.success) {
          toast.success("Produto salvo com sucesso", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          closeModal();
          fetchData();
        } else {
          toast.error(response.data.err, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
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

  function fetchDataChildren() {
    setTimeout(() => {
      if (produto) {
        formEdit.current.setData(produto);
        setprodutoFoto(produto.produtoFoto);
      } else {
        setprodutoFoto(null);
      }
    }, 100);
  }

  useEffect(() => {
    fetchDataChildren();
    // eslint-disable-next-line
  }, [modalVisible]);

  return (
    <Modal
      open={modalVisible}
      onClose={closeModal}
      styles={customStyles}
      center
    >
      {console.log(produto)}
      <div className="container-fluid">
        <Form ref={formEdit} onSubmit={addProduto}>
          <div className="mr-3 mb-3">
            <h3 className="colorBackground">
              {produto ? "Editar" : "Adicionar"} Produto
            </h3>
          </div>
          <div className="row">
            <div className="form-group col-6">
              <Input
                type="text"
                label="Título"
                name="titulo"
                className="inputStyle form-control"
              />
            </div>
            <div className="form-group col-6">
              <Input
                type="text"
                label="Marca"
                name="marca"
                className="inputStyle form-control"
              />
            </div>
            <div className="form-group col-6">
              <Input
                type="text"
                label="Descrição"
                name="descricao"
                className="inputStyle form-control"
              />
            </div>
            <div className="form-group col-6">
              <Input
                type="text"
                label="Cor"
                name="color"
                className="inputStyle form-control"
              />
            </div>
            <div className="form-group col-6">
              <Input
                type="number"
                label="Estoque"
                name="estoque"
                className="inputStyle form-control"
              />
            </div>
            <div className="form-group col-6">
              <Input
                type="number"
                label="Preço"
                name="preco"
                className="inputStyle form-control"
              />
            </div>
            <div className="form-group mb-4 col-12">
              <label>Logo</label>
              <br />
              <Dropzone
                onDrop={async (values) => {
                  let fd = new FormData();
                  fd.append("folder", "produto");
                  values.map((file) => {
                    return fd.append("file", file);
                  });
                  const response = await api.post("/upload", fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                  });
                  setprodutoFoto(response?.data?.file);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Avatar
                        size="100"
                        className="fotoperfil"
                        src={`${process.env.REACT_APP_API_URL}/upload/?&mimetype=${produtoFoto?.mimetype}&filename=${produtoFoto?.filename}&folder=produto`}
                      />
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="float-right">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-danger mr-2"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-success float-right">
                {produto ? "alterar" : "adicionar"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

const customStyles = {
  modal: {
    borderRadius: "1%",
    minWidth: "100px",
    width: "800px",
  },
};
