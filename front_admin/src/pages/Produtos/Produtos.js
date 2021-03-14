import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import api from "../../service/api";
import ReactPaginate from "react-paginate";
import ModalProduto from "./ModalProduto";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import ValueDL from "../../core/valueDL";

export default function Produtos({ history }) {
  const [lista, setlista] = useState([]);
  const [titulo, settitulo] = useState("");
  const [skip, setSkip] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [modalProduto, setmodalProduto] = useState(false);
  const [produto, setproduto] = useState(false);
  const limit = 10;

  async function fetchData() {
    const response = await api.post("/v1/produtos/list", {
      busca: titulo,
      limit,
      skip,
    });
    setlista(response.data.data);
    setPageCount(response.data.total / limit);
  }

  function edit(el) {
    setproduto(el);
    setmodalProduto(true);
  }

  function adicionar() {
    setproduto(null);
    setmodalProduto(true);
  }

  function fetchPagination(data) {
    const skip = data.selected * limit;
    window.scroll(0, 0);
    setSkip(skip);
  }

  async function remover(_id, titulo) {
    confirmAlert({
      title: "Excluir demonstração",
      message: `Excluir ${titulo} ?`,
      buttons: [
        {
          label: "Sim",
          onClick: async () => {
            const response = await api.delete(`/v1/produtos/${_id}`);
            if (!response.data.success) {
              toast.error(response.data.err, {
                position: toast.POSITION.BOTTOM_LEFT,
              });
              return;
            }
            toast.success("Sucesso!", {
              position: toast.POSITION.BOTTOM_LEFT,
            });
            fetchData();
          },
        },
        {
          label: "Não",
        },
      ],
    });
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  return (
    <>
      <ModalProduto
        closeModal={() => setmodalProduto(false)}
        modalVisible={modalProduto}
        history={history}
        fetchData={fetchData}
        produto={produto}
      />
      <Header />
      <div className="container">
        <div className="d-block mb-4">
          <span className="text-primary">Produtos </span>
          <span className="text-secondary ml-2">Todos os produtos</span>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-3 mt-2 mb-3">
            <input
              type="text"
              value={titulo}
              onChange={(e) => settitulo(e.target.value)}
              className="input-search"
              placeholder="Pesquise um Produto"
            />
          </div>
          <div className="col-sm-12 col-md-3 mt-2 mb-3">
            <button className="btn-main w-100" onClick={() => fetchData()}>
              Buscar
            </button>
          </div>
          <div className="col-sm-12 col-md-3 mt-2 mb-3">
            <button
              className="btn btnSuccess w-100"
              onClick={() => adicionar()}
            >
              Adicionar
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card-content">
              <table className="table">
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Produto</th>
                    <th>Marca</th>
                    <th>Cor predominante</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((el, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <img
                            alt="produto"
                            width="60"
                            height="60"
                            src={`${process.env.REACT_APP_API_URL}/upload/?&mimetype=${el.produtoFoto.mimetype}&filename=${el.produtoFoto.filename}&folder=produto`}
                          />
                        </td>
                        <td>{el.titulo}</td>
                        <td>{el.marca}</td>
                        <td>{el.color}</td>

                        <td>{ValueDL(el.preco)}</td>
                        <td>{el.estoque}</td>
                        <td>
                          <button
                            onClick={() => edit(el)}
                            className="btn btn-sm btn-dark mr-2 mb-2"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => remover(el._id, el.titulo)}
                            className="btn btn-sm btn-danger mr-2 mb-2"
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {lista.length > 0 && (
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  breakLabel="..."
                  breakClassName="page-item disabled"
                  breakLinkClassName="page-link"
                  disabledClassName="disabled"
                  pageCount={pageCount}
                  pageClassName="page-item"
                  previousClassName="page-item"
                  pageLinkClassName="page-link"
                  initialPage={0}
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  marginPagesDisplayed="0"
                  pageRangeDisplayed="6"
                  onPageChange={fetchPagination}
                  containerClassName="pagination"
                  subContainerClassName="pages"
                  activeClassName="active"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
